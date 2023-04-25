import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { LayoutsModule } from './layouts/layouts.module';
import { NavbarModule } from './layouts/navbar/navbar.module';
import { LoginModule } from './login/login.module';
import { ProductsModule } from './products/products.module'
import { FormsModule } from '@angular/forms';
import { ProductImagesModule } from './products/product-images/product-images.module';
import { PriceListModule } from './price-list/price-list.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    LayoutsModule,
    LoginModule,
    ProductsModule,
    FormsModule,
    PriceListModule
  ],
  exports:[
    HomeModule,
    LayoutsModule,
    NavbarModule,
    LoginModule,
    ProductsModule,
    PriceListModule
  ]
})
export class AdminModule { }
