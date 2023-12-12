import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductVariant } from 'src/app/models/product-variant';
import { TableRefreshService } from '../table-refresh/table-refresh.service';

@Injectable({
	providedIn: 'root',
})
export class ProductVariantService {
	productVariantChanged = new Subject<ProductVariant[]>();

	private productVariants: ProductVariant[] = [
		new ProductVariant(1, 1, 'Harry Potter', 10, new Date()),
		new ProductVariant(2, 1, 'Dumbledore', 10, new Date()),
		new ProductVariant(3, 1, 'Hermione', 10, new Date()),
		new ProductVariant(4, 1, 'Ron', 5, new Date()),
		new ProductVariant(5, 1, 'Snape', 6, new Date()),
		new ProductVariant(6, 1, 'Sirius', 7, new Date()),
		new ProductVariant(7, 1, 'Voldemort', 3, new Date()),
		new ProductVariant(8, 1, 'Luna', 4, new Date()),
		new ProductVariant(9, 2, 'Harry Potter', 20, new Date()),
		new ProductVariant(10, 2, 'Hermione', 15, new Date()),
		new ProductVariant(11, 2, 'Ron', 15, new Date()),
		new ProductVariant(12, 2, 'Luna', 10, new Date()),
		new ProductVariant(13, 2, 'Draco', 3, new Date()),
		new ProductVariant(14, 2, 'Voldemort', 2, new Date()),
		new ProductVariant(15, 2, 'Dumbledore', 15, new Date()),
		new ProductVariant(16, 2, 'Snape', 6, new Date()),
		new ProductVariant(17, 2, 'Ginny', 3, new Date()),
		new ProductVariant(18, 2, 'Sirius', 4, new Date()),
		new ProductVariant(19, 2, 'Bellatrix', 5, new Date()),
		new ProductVariant(20, 2, 'Lucius', 2, new Date()),
		new ProductVariant(21, 2, 'Newt', 2, new Date()),
		new ProductVariant(22, 3, 'Golden sand', 50, new Date()),
		new ProductVariant(23, 3, 'White sand', 50, new Date()),
		new ProductVariant(24, 4, 'Silver wings', 50, new Date()),
		new ProductVariant(25, 5, 'Silver', 50, new Date()),
		new ProductVariant(26, 5, 'Golden', 50, new Date()),
		new ProductVariant(27, 6, 'Harry Quidditch', 10, new Date()),
		new ProductVariant(28, 6, 'Harry Potter', 10, new Date()),
		new ProductVariant(29, 6, 'Ron', 10, new Date()),
		new ProductVariant(30, 6, 'Dobby', 10, new Date()),
		new ProductVariant(31, 6, 'Hedwig', 10, new Date()),
		new ProductVariant(32, 6, 'Dumbledore', 10, new Date()),
		new ProductVariant(33, 6, 'Hermione', 10, new Date()),
		new ProductVariant(34, 6, 'Hagrid', 10, new Date()),
	];

	constructor(private tableRefreshService: TableRefreshService) {}

	getProductVariants(includeDeleted: boolean = false) {
		const variants = this.productVariants.slice().filter(v => includeDeleted || v.IsActive);
		return variants;
	}

	getProductVariant(id: number, includeDeleted: boolean = false) {
		let variant = this.productVariants.find((p) => p.Id == id && ( includeDeleted || p.IsActive));

		if (variant) {
			return variant;
		}

		return new ProductVariant(0, 0, '', 0, new Date());
	}

	getProductVariantsByProductId(productId: number, includeDeleted: boolean = false) {
		return this.productVariants.filter((x) => x.ProductId == productId && (includeDeleted || x.IsActive));
	}

	saveProductVariant(variant: ProductVariant) {
		variant.Id =
			this.productVariants.reduce((prev, current) => {
				return prev.Id > current.Id ? prev : current;
			}).Id + 1;

		this.productVariants.push(variant);
		this.productVariantChanged.next(this.getProductVariantsByProductId(variant.ProductId));
		this.tableRefreshService.refreshTablesByType('productVariants');
	}

	updateProductVariant(variant: ProductVariant) {
		const index = this.productVariants.findIndex((p) => p.Id == variant.Id && p.IsActive);

		this.productVariants[index].Description = variant.Description;
		this.productVariants[index].InStock = variant.InStock;
	}

	deleteProductVariant(productVariant: ProductVariant) {
		productVariant.IsActive = false;
		this.productVariantChanged.next(this.getProductVariantsByProductId(productVariant.ProductId));
		this.tableRefreshService.refreshTablesByType('productVariants');
	}
}
