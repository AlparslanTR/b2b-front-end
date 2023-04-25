import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceListDetailsComponent } from './price-list-details.component';
import { RouterModule, Routes } from '@angular/router';
import { PriceListDetailsPipe } from './pipes/price-list-details.pipe';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Routes=[
  {
    path:'',
    component:PriceListDetailsComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SweetAlert2Module
  ],
  declarations: [	PriceListDetailsComponent,
      PriceListDetailsPipe
   ],
  exports:[
    PriceListDetailsComponent
  ]
})
export class PriceListDetailsModule { }
