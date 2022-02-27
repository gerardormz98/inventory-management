import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Purchase } from 'src/app/models/purchase';
import { PurchaseDetail } from 'src/app/models/purchase-detail';
import { ProductVariantService } from '../product-variant/product-variant.service';
import { ProductsService } from '../products/products.service';
import { TableRefreshService } from '../table-refresh/table-refresh.service';

@Injectable({
	providedIn: 'root',
})
export class PurchasesService {
	purchasesChanged = new Subject<Purchase[]>();

	private purchases: Purchase[] = [
		new Purchase(
			1,
			new Date(2021, 7, 19),
			'Shenzhen Fealink Technology',
			'1er pedido Alibaba - Varitas con Luz LED',
			228,
			21.81,
			205,
			9090.53,
			50,
			997.5,
			[new PurchaseDetail(1, 1, 1, 1, 40, 3.8), new PurchaseDetail(2, 1, 1, 2, 20, 3.8)]
		),
		new Purchase(
			2,
			new Date(2021, 10, 26),
			'Shenzhen Fealink Technology',
			'2er pedido Alibaba - Varitas con Luz, Varitas Normales, Collares y Llaveros',
			716,
			65.43,
			580,
			27623.07,
			174.9,
			3667.66,
			[
				new PurchaseDetail(3, 2, 1, 1, 60, 3.8),
				new PurchaseDetail(4, 2, 1, 5, 60, 3.1),
				new PurchaseDetail(5, 2, 2, 15, 60, 0.7),
				new PurchaseDetail(6, 2, 2, 20, 60, 1),
			]
		),
		new Purchase(
			3,
			new Date(2022, 1, 7),
			'Shenzhen Fealink Technology',
			'3er pedido Alibaba - Varitas con Luz LED',
			220.4,
			24.57,
			267,
			10456.33,
			30,
			612,
			[new PurchaseDetail(7, 3, 1, 1, 58, 3.8)]
		),
	];

	constructor(
		private tableRefreshService: TableRefreshService,
		private productsService: ProductsService,
		private productVariantService: ProductVariantService
	) {}

	getPurchases(includeDeleted: boolean = false) {
		let purchases = this.purchases.slice().filter(p => includeDeleted || p.IsActive);
		return purchases;
	}

	getPurchase(purchaseId: number, includeDeleted: boolean = false) {
		let purchase = this.purchases.find((p) => p.Id == purchaseId && (includeDeleted || p.IsActive));

		if (purchase) {
			let purchaseClone = new Purchase(
				purchase.Id,
				purchase.Date,
				purchase.Supplier,
				purchase.Description,
				purchase.GoodsCostUSD,
				purchase.CommissionUSD,
				purchase.ShippingCostUSD,
				purchase.GoodsCommissionAndShippingMXN,
				purchase.ImportCostUSD,
				purchase.ImportCostMXN,
				purchase.PurchaseDetails
			);

			purchaseClone.PurchaseDetails = purchaseClone.PurchaseDetails.map((d) => {
				d.Product = this.productsService.getProductById(d.ProductId);
				d.ProductVariant = this.productVariantService.getProductVariant(d.ProductVariantId);
				return d;
			});

			return purchaseClone;
		}

		return new Purchase(0, new Date(), '', '', 0, 0, 0, 0, 0, 0, [new PurchaseDetail(0, 0, 0, 0, 1, 0, 0)]);
	}

	updatePurchase(purchase: Purchase) {
		const index = this.purchases.findIndex((p) => p.Id == purchase.Id && p.IsActive);
		const originalPurchaseDetails = this.purchases[index].PurchaseDetails.slice();

		this.purchases[index] = purchase;
		this.purchasesChanged.next(this.getPurchases());
		this.tableRefreshService.refreshTablesByType('purchases');

		purchase.PurchaseDetails.forEach((d) => {
			const variant = this.productVariantService.getProductVariant(d.ProductVariantId);
			const originalQuantity = originalPurchaseDetails.find((d) => d.ProductVariantId == variant.Id).Quantity;

			variant.InStock += d.Quantity - originalQuantity;
			this.productVariantService.updateProductVariant(variant);
		});
	}

	savePurchase(purchase: Purchase) {
		purchase.Id =
			this.purchases.reduce((prev, current) => {
				return prev.Id > current.Id ? prev : current;
			}).Id + 1;

		this.purchases.push(purchase);
		this.purchasesChanged.next(this.getPurchases());
		this.tableRefreshService.refreshTablesByType('purchases');

		purchase.PurchaseDetails.forEach((d) => {
			const variant = this.productVariantService.getProductVariant(d.ProductVariantId);
			variant.InStock += d.Quantity;
			this.productVariantService.updateProductVariant(variant);
		});
	}
}
