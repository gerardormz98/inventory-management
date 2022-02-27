import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-sales-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  private ordersChangedSub!: Subscription;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.orders = this.ordersService.getOrders();

    this.ordersChangedSub = this.ordersService.ordersChanged.subscribe((value) => {
      this.orders = value;
    });
  }

  ngOnDestroy(): void {
      this.ordersChangedSub.unsubscribe();
  }
}
