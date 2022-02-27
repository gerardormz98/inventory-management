import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
	selector: 'app-order-details-page',
	templateUrl: './order-details-page.component.html',
	styleUrls: ['./order-details-page.component.css'],
})
export class OrderDetailsPageComponent implements OnInit {
	orderId: number = 0;
	order!: Order;

	constructor(
		private ordersService: OrdersService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.orderId = this.route.snapshot.params['id'];
		this.order = this.ordersService.getOrder(this.orderId);

		if (!this.order.Id) {
			this.router.navigateByUrl('/orders');
		}
	}
}
