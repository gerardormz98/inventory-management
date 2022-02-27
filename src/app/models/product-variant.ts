import { Product } from "./product";

export class ProductVariant {
    Id: number = 0;
    ProductId: number = 0;
    Description: string = "";
    InStock: number = 0;
    AddedDate: Date = new Date();
	 IsActive: boolean = true;

	 Product?: Product;

    constructor(id: number, productId: number, description: string, inStock: number, addedDate: Date) {
        this.Id = id;
        this.ProductId = productId;
        this.Description = description;
        this.InStock = inStock;
        this.AddedDate = addedDate;
    }
}
