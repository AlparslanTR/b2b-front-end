import { PriceListComponent } from './admin/price-list/price-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './admin/layouts/layouts.component';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './admin/login/guard/auth.guard';
import { ProductsComponent } from './admin/products/products.component';
import { ProductImagesComponent } from './admin/products/product-images/product-images.component';
import { PriceListDetailsComponent } from './admin/price-list/price-list-details/price-list-details.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { OrdersComponent } from './admin/orders/orders.component';

const routes: Routes = [
  {
    path: 'admin-login',
    component: LoginComponent,
    loadChildren: ()=> import('./admin/login/login.module').then(m=> m.LoginModule)
  },
  {
    path: '',
    component: LayoutsComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: HomeComponent,
            loadChildren: ()=> import('./admin/home/home.module').then(m=> m.HomeModule)
          },
          // {
          //   path: 'order-detail/:id',
          //   component: OrderDetailComponent,
          //   loadChildren: ()=> import('./admin/orders/order-detail/order-detail.module').then(m=> m.OrderDetailModule)
          // }
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductsComponent,
            loadChildren: ()=> import('./admin/products/products.module').then(m=> m.ProductsModule)
          },
          {
            path: ':id/images',
            component: ProductImagesComponent,
            loadChildren: ()=> import('./admin/products/product-images/product-images.module').then(m=> m.ProductImagesModule)
          }
        ]
      },
      {
        path: 'price-list',
        children: [
          {
            path: '',
            component: PriceListComponent,
            loadChildren: ()=> import('./admin/price-list/price-list.module').then(m=> m.PriceListModule)
          },
          {
            path: ':id',
            component: PriceListDetailsComponent,
            loadChildren: ()=> import('./admin/price-list/price-list-details/price-list-details.module').then(m=> m.PriceListDetailsModule)
          }
        ]
      },
      {
        path: 'customers',
        children: [
          {
            path: '',
            component: CustomersComponent,
            loadChildren: ()=> import('./admin/customers/customers.module').then(m=> m.CustomersModule)
          }
        ]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        loadChildren: ()=> import('./admin/profile/profile.module').then(m=> m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

