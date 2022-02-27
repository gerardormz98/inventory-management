import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { OrdersService } from '../orders/orders.service';
import { ProductVariantService } from '../product-variant/product-variant.service';
import { ProductsService } from '../products/products.service';
import { PurchasesService } from '../purchases/purchases.service';

@Injectable({
	providedIn: 'root',
})
export class ReportsService {
	constructor(
		private purchasesService: PurchasesService,
		private ordersService: OrdersService,
		private productsService: ProductsService,
		private productVariantService: ProductVariantService
	) {}

	getTotalExpenses() {
		return this.purchasesService.getPurchases(true).reduce((prev, current) => prev + current.TotalMXN, 0);
	}

	getTotalIncome() {
		return this.ordersService.getOrders(true).reduce((prev, current) => prev + current.Total, 0);
	}

	getTotalGainOrLoss() {
		return this.getTotalIncome() - this.getTotalExpenses();
	}

	getCompletedSales() {
		return this.ordersService.getOrders(true).length;
	}

	getMostOrderedProducts() {
		let products = [];

		this.ordersService.getOrders(true).map(o => {
			o.OrderDetails.map(d => {
				products[d.ProductVariantId] = (products[d.ProductVariantId] ? products[d.ProductVariantId] : 0) + d.Quantity;
			});
		});

		for (let p in products) {
			const quantity = products[p];
			const variantObj = this.productVariantService.getProductVariant(+p, true);
			const productObj = this.productsService.getProductById(variantObj.ProductId, true);

			products[p] = {
				variant: variantObj,
				product: productObj,
				quantity
			}
		}

		products.sort((a, b) => {
			return b["quantity"] - a["quantity"]
		})

		return products.slice(0,5);
	}

	getSalesHistory() {
		let sales = [];

		this.ordersService.getOrders(true).map(o => {
			let dateStr = moment(o.Date).format('DD-MM-YYYY');
			sales[dateStr] = (sales[dateStr] ? sales[dateStr] : 0) + o.Total;
		});

		sales.sort((a, b) => {
			return b.Date.getTime() - a.Date.getTime()
		});

		let salesObjArr = [];

		for (let idx in Object.keys(sales)) {
			let dateKey = Object.keys(sales)[idx];
			salesObjArr.push({
				x: dateKey,
				y: sales[dateKey]
			});
		}

		return salesObjArr;
	}
}
