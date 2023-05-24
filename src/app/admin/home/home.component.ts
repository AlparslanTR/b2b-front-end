import { ErrorService } from 'src/app/services/error.service';
import { HomeService } from './services/home.service';
import { Component, inject } from '@angular/core';
import { User } from './models/user';
import { Customer } from '../customers/models/customer';
import { CustomerService } from '../customers/services/customer.service';
import { ProductsService } from '../products/services/products.service';
import { Product } from '../products/models/product';
import { OrderService } from '../orders/services/order.service';
import { ToastrService } from 'ngx-toastr';

declare var $ :any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
homeService=inject(HomeService);
errorService=inject(ErrorService);
toastrService=inject(ToastrService);
customerService=inject(CustomerService);
productService=inject(ProductsService);
orderService=inject(OrderService);

users : User[]=[];
user : User=new User();

customers : Customer[]=[];
products : Product[]=[];
orders : []=[];

ngOnInit(){
  this.getList();
  this.getListCustomer();
  this.getListProduct();
  this.getListOrder();
}

// Kullanıcıları Getir
getList(){
  this.homeService.getList().subscribe((res: any) => {
    this.users = res.data;
    console.log(res.data);
    setTimeout(() => {
      $('.dataTables-example').DataTable({
        language: {
          "sEmptyTable":     "Tabloda herhangi bir veri mevcut değil",
          "sInfo":           "_TOTAL_ kayıttan _START_ - _END_ arasındaki kayıtlar gösteriliyor",
          "sInfoEmpty":      "Kayıt yok",
          "sInfoFiltered":   "(_MAX_ kayıt içerisinden bulunan 0)",
          "sInfoPostFix":    "",
          "sInfoThousands":  ".",
          "sLengthMenu":     "Sayfada _MENU_ Kayıtlar",
          "sLoadingRecords": "Yükleniyor...",
          "sProcessing":     "İşleniyor...",
          "sSearch":         "Arama:",
          "sZeroRecords":    "Eşleşen kayıt bulunamadı",
          "oPaginate": {
              "sFirst":    "İlk",
              "sLast":     "Son",
              "sNext":     "Sonraki",
              "sPrevious": "Önceki"
          },
          "oAria": {
              "sSortAscending":  ": artan sütun sıralamasını aktifleştir",
              "sSortDescending": ": azalan sütun sıralamasını aktifleştir"
          }
        },
        pageLength: 25,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
          { extend: 'copy' },
          { extend: 'csv' },
          { extend: 'excel', title: 'Kullanıcı Tablosu Listesi' },
          { extend: 'pdf', title: 'Kullanıcı Tablosu Listesi' },
          {
            extend: 'print', title:"Kullanıcı Listesi",
            customize: function (win: { document: { body: any; };  }) {
              $(win.document.body).addClass('white-bg');
              $(win.document.body).css('font-size', '10px');

              $(win.document.body).find('table')
                .addClass('compact')
                .css('font-size', 'inherit');
            }
          }
        ]
      });
    });
  }, (err) => {
    this.errorService.errorHandler(err);
  });
}

getTotalUserCount(): number {
  return this.users.length;
}
// ***********************

// Dashboard için müşterilerin toplamını aldık
getListCustomer(){
  this.customerService.getList().subscribe((res:any)=>{
    this.customers=res.data;
  })
}
getTotalCustomerCount(): number {
  return this.customers.length;
}

// ***********************

getListProduct(){
  this.productService.getList().subscribe((res:any)=>{
    this.products=res.data;
  })
}

getTotalProductsCount(): number {
  return this.products.length;
}

// ***********************

getListOrder(){
  this.orderService.getList().subscribe((res:any)=>{
    this.orders=res.data;
  })
}

getTotalOrdersCount(): number {
  return this.orders.length;
}

delete(user:User) {
  this.homeService.delete(user).subscribe((res:any)=>{
    this.toastrService.success(res.message);
    $('.dataTables-example').DataTable().destroy();
    setTimeout(() => {
  this.getList();
}, 0);
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

}
