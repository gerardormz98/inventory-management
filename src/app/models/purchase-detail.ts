import { Product } from "./product";
import { ProductVariant } from "./product-variant";

export class PurchaseDetail {
	Id: number = 0;
	PurchaseId: number = 0;
	ProductId: number = 0;
	ProductVariantId: number = 0;
	Quantity: number = 0;
	UnitPriceUSD: number = 0;
	UnitPriceMXN: number = 0;

	Product?: Product;
	ProductVariant?: ProductVariant;

	get TotalPriceMXN() {
		return this.UnitPriceMXN * this.Quantity;
	}

	// If unit price (MXN) is not specified, it will be calculated automatically (USD = $21 MXN).
	constructor(id: number, purchaseId: number, productId: number, productVariantId: number, quantity: number, unitPriceUSD: number, unitPriceMXN?: number) {
		this.Id = id;
		this.PurchaseId = purchaseId;
		this.ProductId = productId;
		this.ProductVariantId = productVariantId;
		this.Quantity = quantity;
		this.UnitPriceUSD = unitPriceUSD;
		this.UnitPriceMXN = unitPriceMXN ? unitPriceMXN : Math.round(((unitPriceUSD * 21) + Number.EPSILON) * 100) / 100;
	}
}
