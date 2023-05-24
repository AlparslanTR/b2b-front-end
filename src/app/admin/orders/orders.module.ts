import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OrderDetailModule } from './order-details/order-detail/order-detail.module';

const routes:Routes =[
  {
    path:'',
    component:OrdersComponent
  }
]

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SweetAlert2Module,
    OrderDetailModule
  ],
  exports:[
    OrdersComponent,
    OrderDetailModule
  ]
})
export class OrdersModule { }
