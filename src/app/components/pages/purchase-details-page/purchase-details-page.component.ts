import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from 'src/app/models/purchase';
import { PurchasesService } from 'src/app/services/purchases/purchases.service';

@Component({
  selector: 'app-purchase-details-page',
  templateUrl: './purchase-details-page.component.html',
  styleUrls: ['./purchase-details-page.component.css']
})
export class PurchaseDetailsPageComponent implements OnInit {
	purchaseId: number = 0;
	purchase: Purchase;

	constructor(
		private purhcasesService: PurchasesService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.purchaseId = this.route.snapshot.params['id'];
		this.purchase = this.purhcasesService.getPurchase(this.purchaseId);

		if (!this.purchase.Id) {
			this.router.navigateByUrl('/purchases');
		}
	}
}
