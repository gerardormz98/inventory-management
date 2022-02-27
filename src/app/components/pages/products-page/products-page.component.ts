import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/products/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private productsChangedSub!: Subscription;

  constructor(private productsService: ProductsService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();

    this.productsChangedSub = this.productsService.productsChanged.subscribe((value) => {
      this.products = value;
    });
  }

  openModal(product: Product) {
    this.modalService.openConfirmDeleteModal(product.Description, () => {
      this.productsService.deleteProduct(product.Id);
    })
  }

  ngOnDestroy(): void {
    this.productsChangedSub.unsubscribe();
  }
}
