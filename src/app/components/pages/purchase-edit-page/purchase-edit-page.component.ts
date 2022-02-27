import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Product } from 'src/app/models/product';
import { ProductVariant } from 'src/app/models/product-variant';
import { Purchase } from 'src/app/models/purchase';
import { PurchaseDetail } from 'src/app/models/purchase-detail';
import { ProductVariantService } from 'src/app/services/product-variant/product-variant.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { PurchasesService } from 'src/app/services/purchases/purchases.service';

interface PurchaseDetailFields {
	product: number;
	productVariant: number;
	quantity: number;
	unitPriceUSD: number;
	unitPriceMXN: number;
}

@Component({
	selector: 'app-purchase-edit-page',
	templateUrl: './purchase-edit-page.component.html',
	styleUrls: ['./purchase-edit-page.component.css'],
})
export class PurchaseEditPageComponent implements OnInit {
	id: number = 0;
	purchase: Purchase;
	form: FormGroup;
	products: Product[];
	productVariants: ProductVariant[];
	isEditMode = true;

	get purchaseDetailsFormArray() {
		return this.form.get('purchaseDetails') as FormArray;
	}

	get purchaseDetailsControls() {
		return this.purchaseDetailsFormArray.controls as FormGroup[];
	}

	constructor(
		private purchasesService: PurchasesService,
		private productsService: ProductsService,
		private productVariantsService: ProductVariantService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.id = this.route.snapshot.params['id'];
		this.isEditMode = !!this.id;

		this.purchase = this.purchasesService.getPurchase(this.id);
		this.products = this.productsService.getProducts();
		this.productVariants = this.productVariantsService.getProductVariants();

		if (this.isEditMode && !this.purchase.Id) {
			this.router.navigateByUrl('/purchases');
		}

		this.form = new FormGroup({
			date: new FormControl(moment(this.purchase.Date).format('YYYY-MM-DD'), [Validators.required]),
			supplier: new FormControl(this.purchase.Supplier, [Validators.required]),
			description: new FormControl(this.purchase.Description, [Validators.required]),
			goodsCostUSD: new FormControl(this.purchase.GoodsCostUSD, [Validators.required, Validators.min(0)]),
			commissionUSD: new FormControl(this.purchase.CommissionUSD, [Validators.required, Validators.min(0)]),
			shippingCostUSD: new FormControl(this.purchase.ShippingCostUSD, [Validators.required, Validators.min(0)]),
			goodsCommissionAndShippingMXN: new FormControl(this.purchase.GoodsCommissionAndShippingMXN, [Validators.required, Validators.min(0)]),
			importCostUSD: new FormControl(this.purchase.ImportCostUSD, [Validators.required, Validators.min(0)]),
			importCostMXN: new FormControl(this.purchase.ImportCostMXN, [Validators.required, Validators.min(0)]),
			purchaseDetails: new FormArray(
				this.purchase.PurchaseDetails.map((detail) => this.getPurchaseDetailForm(detail)),
				Validators.required
			),
		});

		if (!this.isEditMode) {
			this.updateProductVariantSelection(0);
		}
	}

	updateProductVariantSelection(purchaseDetailIndex: number) {
		const firstProduct = this.products[0];
		this.purchaseDetailsControls[purchaseDetailIndex].patchValue({
			product: firstProduct.Id,
		});
		this.onChangeProduct(purchaseDetailIndex, firstProduct.Id);
	}

	onChangeProduct(purchaseDetailIndex: number, productId: number) {
		const purchaseDetail = this.purchase.PurchaseDetails[purchaseDetailIndex];
		let selectedVariant = purchaseDetail ? purchaseDetail.ProductVariantId : 0;

		if (!purchaseDetail || productId != purchaseDetail.ProductId) {
			const firstVariant = this.productVariants.find((v) => v.ProductId == productId);
			selectedVariant = firstVariant ? firstVariant.Id : 0;
		}

		const product = this.productsService.getProductById(productId);

		this.purchaseDetailsControls[purchaseDetailIndex].patchValue({
			productVariant: selectedVariant,
			unitPrice: product.RecommendedPrice,
		});
	}

	onAddDetail() {
		const newDetail = new PurchaseDetail(0, this.purchase.Id, 1, 1, 0, 0, 0);
		this.purchaseDetailsFormArray.push(this.getPurchaseDetailForm(newDetail));
		this.updateProductVariantSelection(this.purchaseDetailsFormArray.length - 1);
	}

	onRemoveDetail(index: number) {
		this.purchaseDetailsFormArray.removeAt(index);
	}

	getPurchaseDetailForm(detail: PurchaseDetail) {
		return new FormGroup({
			product: new FormControl(detail.ProductId, [Validators.required]),
			productVariant: new FormControl(detail.ProductVariantId, [Validators.required]),
			quantity: new FormControl(detail.Quantity, [Validators.required, Validators.min(1)]),
			unitPriceUSD: new FormControl(detail.UnitPriceUSD, [Validators.required, Validators.min(0)]),
			unitPriceMXN: new FormControl(detail.UnitPriceMXN, [Validators.required, Validators.min(0)]),
		});
	}

	getCurrentPurchaseTotal() {
		const values = this.form.value;
		return values.goodsCommissionAndShippingMXN + values.importCostMXN;
	}

	getFilteredVariants(productId: number) {
		return this.productVariants.filter((v) => v.ProductId == productId);
	}

	onSavePurchase() {
		const values = this.form.value;

		this.purchase.Date = values.date;
		this.purchase.Supplier = values.supplier;
		this.purchase.Description = values.description;
		this.purchase.GoodsCostUSD = values.goodsCostUSD;
		this.purchase.CommissionUSD = values.commissionUSD;
		this.purchase.ShippingCostUSD = values.shippingCostUSD;
		this.purchase.GoodsCommissionAndShippingMXN = values.goodsCommissionAndShippingMXN;
		this.purchase.ImportCostUSD = values.importCostUSD;
		this.purchase.ImportCostMXN = values.importCostMXN;
		this.purchase.PurchaseDetails = values.purchaseDetails.map((d: PurchaseDetailFields) => {
			return new PurchaseDetail(0, this.purchase.Id, d.product, d.productVariant, d.quantity, d.unitPriceUSD, d.unitPriceMXN);
		});

		if (this.isEditMode) {
			this.purchasesService.updatePurchase(this.purchase);
		} else {
			this.purchasesService.savePurchase(this.purchase);
		}

		this.router.navigate(['/purchases', this.purchase.Id], { relativeTo: this.route });
	}

	onCancel() {
		this.router.navigateByUrl('/purchases');
	}
}
