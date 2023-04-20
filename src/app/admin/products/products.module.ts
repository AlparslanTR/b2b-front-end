import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule, Routes } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { ProductImagesModule } from './product-images/product-images.module';
import { ProductImagesComponent } from './product-images/product-images.component';

const routes:Routes = [
  {
    path:'',
    component:ProductsComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SweetAlert2Module.forRoot(),
    FormsModule,
    ProductImagesModule
  ],
  declarations: [ProductsComponent],
  exports:[
     ProductsComponent,
    ProductImagesModule
  ]
})
export class ProductsModule { }
