import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPageComponent } from '../components/pages/dashboard-page/dashboard-page.component';
import { OtherExpensesPageComponent } from '../components/pages/other-expenses-page/other-expenses-page.component';
import { ProductsPageComponent } from '../components/pages/products-page/products-page.component';
import { PurchasesPageComponent } from '../components/pages/purchases-page/purchases-page.component';
import { OrdersPageComponent } from '../components/pages/orders-page/orders-page.component';
import { TaxesPageComponent } from '../components/pages/taxes-page/taxes-page.component';
import { ProductEditPageComponent } from '../components/pages/product-edit-page/product-edit-page.component';
import { ProductVariantEditFormComponent } from '../components/product-variant-edit-form/product-variant-edit-form.component';
import { OrderEditPageComponent } from '../components/pages/order-edit-page/order-edit-page.component';
import { OrderDetailsPageComponent } from '../components/pages/order-details-page/order-details-page.component';
import { PurchaseEditPageComponent } from '../components/pages/purchase-edit-page/purchase-edit-page.component';
import { PurchaseDetailsPageComponent } from '../components/pages/purchase-details-page/purchase-details-page.component';

const routes: Routes = [
	{ path: '', component: DashboardPageComponent },
	{ path: 'dashboard', component: DashboardPageComponent },
	{ path: 'products', component: ProductsPageComponent },
	{ path: 'products/new', component: ProductEditPageComponent },
	{ path: 'products/:id/edit', component: ProductEditPageComponent },
	{ path: 'variants/:id/edit', component: ProductVariantEditFormComponent },
	{ path: 'orders', component: OrdersPageComponent },
	{ path: 'orders/new', component: OrderEditPageComponent },
	{ path: 'orders/:id', component: OrderDetailsPageComponent },
	{ path: 'orders/:id/edit', component: OrderEditPageComponent },
	{ path: 'purchases', component: PurchasesPageComponent },
	{ path: 'purchases/new', component: PurchaseEditPageComponent },
	{ path: 'purchases/:id', component: PurchaseDetailsPageComponent },
	{ path: 'purchases/:id/edit', component: PurchaseEditPageComponent },
	{ path: 'taxes', component: TaxesPageComponent },
	{ path: 'expenses', component: OtherExpensesPageComponent },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
