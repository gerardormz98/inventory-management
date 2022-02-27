import { ProductVariant } from "./product-variant";

export class Product {
    Id: number = 0;
    Description: string = "";
    InStock: number = 0;
    RecommendedPrice: number = 0;
    AddedDate: Date = new Date();
	 IsActive: boolean = true;

	 Variants?: ProductVariant[];

    constructor(id: number, description: string, inStock: number, recommendedPrice: number, addedDate: Date) {
        this.Id = id;
        this.Description = description;
        this.InStock = inStock;
        this.RecommendedPrice = recommendedPrice;
        this.AddedDate = addedDate;
    }
}
