import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductVariant } from 'src/app/models/product-variant';
import { ProductVariantService } from 'src/app/services/product-variant/product-variant.service';

@Component({
	selector: 'app-product-variant-edit-form',
	templateUrl: './product-variant-edit-form.component.html',
	styleUrls: ['./product-variant-edit-form.component.css'],
})
export class ProductVariantEditFormComponent implements OnInit {
	@Input() variantId: number = 0;
	@Input() productId: number = 0;
	@Output() saveVariant = new EventEmitter();
	@Output() cancelVariantEdit = new EventEmitter();

	isEditMode: boolean;
	productVariant!: ProductVariant;
	form!: FormGroup;

	constructor(private productVariantService: ProductVariantService) {}

	ngOnInit(): void {
		this.isEditMode = !!this.variantId;

		this.productVariant = this.productVariantService.getProductVariant(this.variantId);

		this.form = new FormGroup({
			description: new FormControl(this.productVariant.Description, Validators.required),
			inStock: new FormControl(this.productVariant.InStock, [Validators.required, Validators.min(0)]),
		});
	}

	onSaveVariant() {
		const values = this.form.value;

		this.productVariant.Description = values.description;
		this.productVariant.InStock = values.inStock;

		if (this.isEditMode) {
			this.productVariantService.updateProductVariant(this.productVariant);
		} else {
			this.productVariant.ProductId = this.productId;
			this.productVariantService.saveProductVariant(this.productVariant);
		}

		this.saveVariant.emit();
	}

	onCancel() {
		this.cancelVariantEdit.emit();
	}

	get backUrl() {
		return `/products/${this.productVariant.ProductId}/edit`;
	}
}
