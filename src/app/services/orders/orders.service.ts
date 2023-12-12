import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order-detail';
import { ProductVariantService } from '../product-variant/product-variant.service';
import { ProductsService } from '../products/products.service';
import { TableRefreshService } from '../table-refresh/table-refresh.service';

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	ordersChanged = new Subject<Order[]>();

	private orders: Order[] = [
		new Order(1, new Date('2021-12-10'), 'Amazon', 'Peter Parker', 67.35, 93.6, 30.97, 3.87, [
			new OrderDetail(1, 1, 1, 2, 449),
		]),
		new Order(2, new Date('2021-12-15'), 'Facebook', 'Doctor Strange', 0, 120, 0, 0, [new OrderDetail(2, 1, 1, 1, 500)]),
		new Order(3, new Date('2021-12-15'), 'Amazon', 'Tony Stark', 149.7, 156, 68.82, 8.6, [
			new OrderDetail(3, 1, 2, 10, 599),
			new OrderDetail(3, 1, 5, 5, 599),
		]),
		new Order(4, new Date('2022-01-10'), 'Whatsapp', 'Rocket Raccoon', 0, 210, 0, 0, [
			new OrderDetail(4, 1, 1, 10, 400),
			new OrderDetail(4, 1, 2, 20, 400),
			new OrderDetail(4, 2, 10, 15, 400),
			new OrderDetail(4, 2, 11, 8, 400),
		]),
	];

	constructor(
		private tableRefreshService: TableRefreshService,
		private productsService: ProductsService,
		private productVariantService: ProductVariantService
	) {}

	getOrders(includeDeleted: boolean = false) {
		return this.orders.slice().filter(o => includeDeleted || o.IsActive);
	}

	getOrder(orderId: number, includeDeleted: boolean = false) {
		let order = this.orders.find((o) => o.Id == orderId && (includeDeleted || o.IsActive));

		if (order) {
			let orderClone = new Order(
				order.Id,
				order.Date,
				order.Platform,
				order.Client,
				order.Commission,
				order.ShippingCost,
				order.IVAWithholding,
				order.ISRWithholding,
				order.OrderDetails
			);

			orderClone.OrderDetails = orderClone.OrderDetails.map((d) => {
				d.Product = this.productsService.getProductById(d.ProductId, true);
				d.ProductVariant = this.productVariantService.getProductVariant(d.ProductVariantId, true);
				return d;
			});

			return orderClone;
		}

		return new Order(0, new Date(), 'Amazon', '', 0, 0, 0, 0, [new OrderDetail(0, 0, 0, 1, 0)]);
	}

	updateOrder(order: Order) {
		const index = this.orders.findIndex((o) => o.Id == order.Id && o.IsActive);
		const originalOrderDetails = this.orders[index].OrderDetails.slice();

		this.orders[index] = order;
		this.ordersChanged.next(this.getOrders());
		this.tableRefreshService.refreshTablesByType('orders');

		order.OrderDetails.forEach((d) => {
			const variant = this.productVariantService.getProductVariant(d.ProductVariantId);
			const originalQuantity = originalOrderDetails.find((d) => d.ProductVariantId == variant.Id)?.Quantity ?? 0;

			variant.InStock -= d.Quantity - originalQuantity;
			this.productVariantService.updateProductVariant(variant);
		});
	}

	saveOrder(order: Order) {
		order.Id =
			this.orders.reduce((prev, current) => {
				return prev.Id > current.Id ? prev : current;
			}).Id + 1;

		this.orders.push(order);
		this.ordersChanged.next(this.getOrders());
		this.tableRefreshService.refreshTablesByType('orders');

		order.OrderDetails.forEach((d) => {
			const variant = this.productVariantService.getProductVariant(d.ProductVariantId);
			variant.InStock -= d.Quantity;
			this.productVariantService.updateProductVariant(variant);
		});
	}
}
