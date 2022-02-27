import { PurchaseDetail } from './purchase-detail';

export class Purchase {
	Id: number = 0;
	Date: Date = new Date();
	Supplier: string = '';
	Description: string = '';
	GoodsCostUSD: number = 0;
	CommissionUSD: number = 0;
	ShippingCostUSD: number = 0;
	GoodsCommissionAndShippingMXN: number = 0;
	ImportCostUSD: number = 0;
	ImportCostMXN: number = 0;
	IsActive: boolean = true;
	PurchaseDetails: PurchaseDetail[] = [];

	private get GoodsCommissionAndShippingUSD() {
		return this.GoodsCostUSD + this.CommissionUSD + this.ShippingCostUSD;
	}

	get GoodsCostMXN() {
		if (!this.GoodsCommissionAndShippingUSD) return 0;
		return (this.GoodsCostUSD * this.GoodsCommissionAndShippingMXN) / this.GoodsCommissionAndShippingUSD;
	}

	get CommissionMXN() {
		if (!this.GoodsCommissionAndShippingUSD) return 0;
		return (this.CommissionUSD * this.GoodsCommissionAndShippingMXN) / this.GoodsCommissionAndShippingUSD;
	}

	get ShippingCostMXN() {
		if (!this.GoodsCommissionAndShippingUSD) return 0;
		return (this.ShippingCostUSD * this.GoodsCommissionAndShippingMXN) / this.GoodsCommissionAndShippingUSD;
	}

	get TotalUSD() {
		return this.GoodsCommissionAndShippingUSD + this.ImportCostUSD;
	}

	get TotalMXN() {
		return this.GoodsCommissionAndShippingMXN + this.ImportCostMXN;
	}

	constructor(
		id: number,
		date: Date,
		supplier: string,
		description: string,
		goodsCostUSD: number,
		commissionUSD: number,
		shippingCostUSD: number,
		goodsCommissionAndShippingMXN: number,
		importCostUSD: number,
		importCostMXN: number,
		purchaseDetails: PurchaseDetail[]
	) {
		this.Id = id;
		this.Date = date;
		this.Supplier = supplier;
		this.Description = description;
		this.GoodsCostUSD = goodsCostUSD;
		this.CommissionUSD = commissionUSD;
		this.ShippingCostUSD = shippingCostUSD;
		this.GoodsCommissionAndShippingMXN = goodsCommissionAndShippingMXN;
		this.ImportCostUSD = importCostUSD;
		this.ImportCostMXN = importCostMXN;
		this.PurchaseDetails = purchaseDetails;
	}
}
