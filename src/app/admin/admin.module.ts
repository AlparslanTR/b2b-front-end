import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { LayoutsModule } from './layouts/layouts.module';
import { NavbarModule } from './layouts/navbar/navbar.module';
import { LoginModule } from './login/login.module';
import { ProductsModule } from './products/products.module'
import { FormsModule } from '@angular/forms';
import { PriceListModule } from './price-list/price-list.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ClaimsModule } from './claims/claims/claims.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    LayoutsModule,
    LoginModule,
    ProductsModule,
    FormsModule,
    PriceListModule,
    CustomersModule,
    OrdersModule,
    ClaimsModule
  ],
  exports:[
    HomeModule,
    LayoutsModule,
    NavbarModule,
    LoginModule,
    ProductsModule,
    PriceListModule,
    CustomersModule,
    OrdersModule,
    ClaimsModule
  ]
})
export class AdminModule { }
