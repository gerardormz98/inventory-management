import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app.routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { ProductsPageComponent } from './components/pages/products-page/products-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { PurchasesPageComponent } from './components/pages/purchases-page/purchases-page.component';
import { OtherExpensesPageComponent } from './components/pages/other-expenses-page/other-expenses-page.component';
import { TaxesPageComponent } from './components/pages/taxes-page/taxes-page.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ProductEditPageComponent } from './components/pages/product-edit-page/product-edit-page.component';
import { TableComponent } from './components/table/table.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ProductVariantEditFormComponent } from './components/product-variant-edit-form/product-variant-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutofocusDirective } from './utils/directives/autofocus.directive';
import { OrderEditPageComponent } from './components/pages/order-edit-page/order-edit-page.component';
import { OrderDetailsPageComponent } from './components/pages/order-details-page/order-details-page.component';
import { PurchaseDetailsPageComponent } from './components/pages/purchase-details-page/purchase-details-page.component';
import { PurchaseEditPageComponent } from './components/pages/purchase-edit-page/purchase-edit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    DashboardPageComponent,
    ProductsPageComponent,
    OrdersPageComponent,
    PurchasesPageComponent,
    OtherExpensesPageComponent,
    TaxesPageComponent,
    PageHeaderComponent,
    ProductEditPageComponent,
    TableComponent,
    ConfirmModalComponent,
    ProductVariantEditFormComponent,
    AutofocusDirective,
    OrderEditPageComponent,
    OrderDetailsPageComponent,
    PurchaseDetailsPageComponent,
    PurchaseEditPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    NgbModalModule,
    ReactiveFormsModule,
	 NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
