import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductVariant } from 'src/app/models/product-variant';
import { ProductVariantService } from '../product-variant/product-variant.service';
import { TableRefreshService } from '../table-refresh/table-refresh.service';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	productsChanged = new Subject<Product[]>();

	private products: Product[] = [
		new Product(1, 'Lightning magic wand', 0, 599, new Date()),
		new Product(2, 'Regular magic wand', 0, 499, new Date()),
		new Product(3, 'Time-turner necklace', 0, 149, new Date()),
		new Product(4, 'Golden snitch necklace', 0, 149, new Date()),
		new Product(5, 'Deathly hallows necklace', 0, 149, new Date()),
		new Product(6, '3D keychain', 0, 149, new Date()),
	];

	constructor(private tableRefreshService: TableRefreshService, private productVariantsService: ProductVariantService) {}

	getProducts(includeDeleted: boolean = false): Product[] {
		const products = this.products.slice().filter(p => includeDeleted || p.IsActive);

		products.forEach((p) => {
			p.Variants = this.productVariantsService.getProductVariantsByProductId(p.Id);
			p.InStock = p.Variants.reduce((prev, current) => {
				return prev + current.InStock;
			}, 0);
		});

		return products;
	}

	getProductById(id: number, includeDeleted: boolean = false): Product {
		let product = this.products.find((p) => p.Id == id && (includeDeleted || p.IsActive));

		if (product) {
			product.Variants = this.productVariantsService.getProductVariantsByProductId(product.Id);
			product.InStock = product.Variants.reduce((prev, current) => {
				return prev + current.InStock;
			}, 0);

			return product;
		}

		return new Product(0, '', 0, 0, new Date());
	}

	saveProduct(product: Product) {
		product.Id =
			this.products.reduce((prev, current) => {
				return prev.Id > current.Id ? prev : current;
			}).Id + 1;

		const defaultVariant = new ProductVariant(0, product.Id, 'Default', 0, new Date())

		this.products.push(product);
		this.productVariantsService.saveProductVariant(defaultVariant);

		this.productsChanged.next(this.getProducts());
		this.tableRefreshService.refreshTablesByType('products');
	}

	updateProduct(product: Product) {
		const index = this.products.findIndex((p) => p.Id == product.Id && p.IsActive);

		this.products[index].Description = product.Description;
		this.products[index].InStock = product.InStock;
		this.products[index].RecommendedPrice = product.RecommendedPrice;
	}

	deleteProduct(productId: number) {
		let product = this.getProductById(productId);
		product.IsActive = false;
		this.productsChanged.next(this.getProducts());
		this.tableRefreshService.refreshTablesByType('products');
	}
}
