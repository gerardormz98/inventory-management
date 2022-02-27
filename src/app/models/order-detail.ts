import { Product } from './product';
import { ProductVariant } from './product-variant';

export class OrderDetail {
	OrderId: number = 0;
	ProductId: number = 0;
	ProductVariantId: number = 0;
	Quantity: number = 0;
	UnitPrice: number = 0;

	Product?: Product = undefined;
	ProductVariant?: ProductVariant = undefined;

	get TotalPrice() {
		return this.Quantity * this.UnitPrice;
	}

	constructor(
		orderId: number,
		productId: number,
		productVariantId: number,
		quantity: number,
		unitPrice: number
	) {
		this.OrderId = orderId;
		this.ProductId = productId;
		this.ProductVariantId = productVariantId;
		this.Quantity = quantity;
		this.UnitPrice = unitPrice;
	}
}
