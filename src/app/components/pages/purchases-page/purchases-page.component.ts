import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Purchase } from 'src/app/models/purchase';
import { PurchasesService } from 'src/app/services/purchases/purchases.service';

@Component({
	selector: 'app-purchases-page',
	templateUrl: './purchases-page.component.html',
	styleUrls: ['./purchases-page.component.css'],
})
export class PurchasesPageComponent implements OnInit, OnDestroy {
	purchases: Purchase[] = [];
	private purchasesChangedSub!: Subscription;

	constructor(private purchasesService: PurchasesService) {}

	ngOnInit(): void {
		this.purchases = this.purchasesService.getPurchases();

		this.purchasesChangedSub = this.purchasesService.purchasesChanged.subscribe((value) => {
			this.purchases = value;
		});
	}

	ngOnDestroy(): void {
		this.purchasesChangedSub.unsubscribe();
	}
}
