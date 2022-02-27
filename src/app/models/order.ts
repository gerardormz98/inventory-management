import { OrderDetail } from './order-detail';

export class Order {
	Id: number = 0;
	Date: Date = new Date();
	Platform: string = '';
	Client: string = '';
	Commission: number = 0;
	ShippingCost: number = 0;
	IVAWithholding: number = 0;
	ISRWithholding: number = 0;
	IsActive: boolean = true;
	OrderDetails: OrderDetail[] = [];

	get Subtotal() {
		return this.Total / 1.16;
	}

	get Expenses() {
		return this.Commission + this.ShippingCost + this.IVAWithholding + this.ISRWithholding;
	}

	get IVA() {
		return this.Subtotal * 0.16;
	}

	get Total() {
		return this.OrderDetails.reduce((prev, current) => {
			return prev + current.TotalPrice;
		}, 0);
	}

	get Revenue() {
		return (
			this.Total -
			this.Commission -
			this.ShippingCost -
			this.IVAWithholding -
			this.ISRWithholding
		);
	}

	constructor(
		id: number,
		date: Date,
		platform: string,
		client: string,
		commission: number,
		shippingCost: number,
		ivaWithholding: number,
		isrWithholding: number,
		orderDetails: OrderDetail[]
	) {
		this.Id = id;
		this.Date = date;
		this.Platform = platform;
		this.Client = client;
		this.Commission = commission;
		this.ShippingCost = shippingCost;
		this.IVAWithholding = ivaWithholding;
		this.ISRWithholding = isrWithholding;
		this.OrderDetails = orderDetails;
	}
}
