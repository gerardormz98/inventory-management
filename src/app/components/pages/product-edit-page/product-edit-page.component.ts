import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductVariant } from 'src/app/models/product-variant';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ProductVariantService } from 'src/app/services/product-variant/product-variant.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
	selector: 'app-product-edit-page',
	templateUrl: './product-edit-page.component.html',
	styleUrls: ['./product-edit-page.component.css'],
})
export class ProductEditPageComponent implements OnInit {
	id: number = 0;
	product!: Product;
	form!: FormGroup;
	isEditMode = true;

	isEditingVariant = false;
	variantEditingId = 0;

	constructor(
		private productsService: ProductsService,
		private productVariantService: ProductVariantService,
		private modalService: ModalService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.id = this.route.snapshot.params['id'];
		this.isEditMode = !!this.id;

		this.product = this.productsService.getProductById(this.id);

		if (this.isEditMode && !this.product.Id) {
			this.router.navigateByUrl('/products');
		}

		this.productVariantService.productVariantChanged.subscribe((productVariants) => {
			this.product.Variants = productVariants;
		});

		this.form = new FormGroup({
			description: new FormControl(this.product.Description, [Validators.required]),
			inStock: new FormControl(this.product.InStock, [Validators.required, Validators.min(0)]),
			recommendedPrice: new FormControl(this.product.RecommendedPrice, [Validators.required, Validators.min(0)]),
		});
	}

	onEditVariant(variantId: number) {
		this.variantEditingId = variantId;
		this.isEditingVariant = true;
	}

	onSaveProduct() {
		const values = this.form.value;

		this.product.Description = values.description;
		this.product.InStock = values.inStock;
		this.product.RecommendedPrice = values.recommendedPrice;

		if (this.isEditMode) {
			this.productsService.updateProduct(this.product);
		} else {
			this.productsService.saveProduct(this.product);
		}

		this.router.navigateByUrl('/products');
	}

	openModal(productVariant: ProductVariant) {
		this.modalService.openConfirmDeleteModal(productVariant.Description, () => {
			this.productVariantService.deleteProductVariant(productVariant);
		});
	}

	onCancel() {
		this.router.navigateByUrl('/products');
	}
}
