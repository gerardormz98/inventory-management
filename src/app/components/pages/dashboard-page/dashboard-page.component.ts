import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';
import { ReportsService } from 'src/app/services/reports/reports.service';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
	completedSales: number;
	totalExpenses: number;
	totalIncome: number;
	totalGainOrLoss: number;
	topOrderedProducts: any[];
	lastSales: any[];

	chartOptions = {
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
			y: {
				beginAtZero: true
			}
		}
	};

	constructor(private reportsService: ReportsService) {}

	ngOnInit(): void {
		this.completedSales = this.reportsService.getCompletedSales();
		this.totalExpenses = this.reportsService.getTotalExpenses();
		this.totalIncome = this.reportsService.getTotalIncome();
		this.totalGainOrLoss = this.reportsService.getTotalGainOrLoss();
		this.topOrderedProducts = this.reportsService.getMostOrderedProducts();
		this.lastSales = this.reportsService.getSalesHistory();

		console.log(this.lastSales)
	}
}
