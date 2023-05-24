import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimsComponent } from './claims.component';
import { RouterModule, Routes } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';

const routes : Routes=[{
  path:'',
  component:ClaimsComponent
}]


@NgModule({
  declarations: [
    ClaimsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SweetAlert2Module,
    FormsModule
  ]
})
export class ClaimsModule { }
