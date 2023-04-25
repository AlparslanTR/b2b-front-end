import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceListComponent } from './price-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PriceListPipe } from './pipe/price-list.pipe';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PriceListDetailsModule } from './price-list-details/price-list-details.module';

const routes: Routes=[
  {
    path:'',
    component:PriceListComponent
  }
]

@NgModule({
  declarations: [
    PriceListComponent,
    PriceListPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SweetAlert2Module,
    PriceListDetailsModule
  ],
  exports:[PriceListComponent,
          PriceListDetailsModule

  ]
})
export class PriceListModule { }
