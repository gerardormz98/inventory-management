import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders/orders.service';
import * as moment from 'moment';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/models/product';
import { ProductVariantService } from 'src/app/services/product-variant/product-variant.service';
import { ProductVariant } from 'src/app/models/product-variant';
import { OrderDetail } from 'src/app/models/order-detail';

interface OrderDetailFields {
	product: number;
	productVariant: number;
	quantity: number;
	unitPrice: number;
}

@Component({
	selector: 'app-order-edit',
	templateUrl: './order-edit-page.component.html',
	styleUrls: ['./order-edit-page.component.css'],
})
export class OrderEditPageComponent implements OnInit {
	id: number = 0;
	order!: Order;
	form!: FormGroup;
	products!: Product[];
	productVariants!: ProductVariant[];
	isEditMode = true;

	get orderDetailsFormArray() {
		return this.form.get('orderDetails') as FormArray;
	}

	get orderDetailsControls() {
		return this.orderDetailsFormArray.controls as FormGroup[];
	}

	constructor(
		private ordersService: OrdersService,
		private productsService: ProductsService,
		private productVariantsService: ProductVariantService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.id = this.route.snapshot.params['id'];
		this.isEditMode = !!this.id;

		this.order = this.ordersService.getOrder(this.id);
		this.products = this.productsService.getProducts();
		this.productVariants = this.productVariantsService.getProductVariants();

		if (this.isEditMode && !this.order.Id) {
			this.router.navigateByUrl('/orders');
		}

		this.form = new FormGroup({
			date: new FormControl(moment(this.order.Date).format('YYYY-MM-DD'), [Validators.required]),
			platform: new FormControl(this.order.Platform, [Validators.required]),
			client: new FormControl(this.order.Client, [Validators.required]),
			commission: new FormControl(this.order.Commission, [Validators.required, Validators.min(0)]),
			shippingCost: new FormControl(this.order.ShippingCost, [Validators.required, Validators.min(0)]),
			IVAWithholding: new FormControl(this.order.IVAWithholding, [Validators.required, Validators.min(0)]),
			ISRWithholding: new FormControl(this.order.ISRWithholding, [Validators.required, Validators.min(0)]),
			orderDetails: new FormArray(
				this.order.OrderDetails.map((detail) => this.getOrderDetailForm(detail)),
				Validators.required
			),
		});

		if (!this.isEditMode) {
			this.updateProductVariantSelection(0);
		}
	}

	updateProductVariantSelection(orderDetailIndex: number) {
		const firstProduct = this.products[0];
		this.orderDetailsControls[orderDetailIndex].patchValue({
			product: firstProduct.Id,
		});
		this.onChangeProduct(orderDetailIndex, firstProduct.Id);
	}

	onChangeProduct(orderDetailIndex: number, productId: number) {
		const orderDetail = this.order.OrderDetails[orderDetailIndex];
		let selectedVariant = orderDetail ? orderDetail.ProductVariantId : 0;

		if (!orderDetail || productId != orderDetail.ProductId) {
			const firstVariant = this.productVariants.find((v) => v.ProductId == productId);
			selectedVariant = firstVariant ? firstVariant.Id : 0;
		}

		const product = this.productsService.getProductById(productId);

		this.orderDetailsControls[orderDetailIndex].patchValue({
			productVariant: selectedVariant,
			unitPrice: product.RecommendedPrice,
		});
	}

	onAddDetail() {
		const newDetail = new OrderDetail(this.order.Id, 0, 0, 1, 0);
		this.orderDetailsFormArray.push(this.getOrderDetailForm(newDetail));
		this.updateProductVariantSelection(this.orderDetailsFormArray.length - 1);
	}

	onRemoveDetail(index: number) {
		this.orderDetailsFormArray.removeAt(index);
	}

	getOrderDetailForm(detail: OrderDetail) {
		return new FormGroup({
			product: new FormControl(detail.ProductId, [Validators.required]),
			productVariant: new FormControl(detail.ProductVariantId, [Validators.required]),
			quantity: new FormControl(detail.Quantity, [Validators.required, Validators.min(1)]),
			unitPrice: new FormControl(detail.UnitPrice, [Validators.required, Validators.min(0)]),
		});
	}

	getCurrentOrderDetailTotal() {
		return this.form.value.orderDetails.reduce(
			(prev: number, current: OrderDetailFields) => prev + current.quantity * current.unitPrice,
			0
		);
	}

	getCurrentOrderCommissions() {
		const values = this.form.value;
		return values.commission + values.shippingCost + values.IVAWithholding + values.ISRWithholding;
	}

	getCurrentOrderRevenue() {
		return this.getCurrentOrderDetailTotal() - this.getCurrentOrderCommissions();
	}

	getFilteredVariants(productId: number) {
		return this.productVariants.filter((v) => v.ProductId == productId);
	}

	onSaveOrder() {
		const values = this.form.value;

		this.order.Date = values.date;
		this.order.Platform = values.platform;
		this.order.Client = values.client;
		this.order.Commission = values.commission;
		this.order.ShippingCost = values.shippingCost;
		this.order.IVAWithholding = values.IVAWithholding;
		this.order.ISRWithholding = values.ISRWithholding;
		this.order.OrderDetails = values.orderDetails.map((d: OrderDetailFields) => {
			return new OrderDetail(this.order.Id, d.product, d.productVariant, d.quantity, d.unitPrice);
		});

		if (this.isEditMode) {
			this.ordersService.updateOrder(this.order);
		} else {
			this.ordersService.saveOrder(this.order);
		}

		this.router.navigate(['/orders', this.order.Id], { relativeTo: this.route });
	}

	onCancel() {
		this.router.navigateByUrl('/orders');
	}
}
