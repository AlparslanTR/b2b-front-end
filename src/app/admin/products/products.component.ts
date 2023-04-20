import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { ErrorService } from 'src/app/services/error.service';
import { Product } from './models/product';
import { ProductsModule } from './products.module';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  // filterText:string=""; // Pipe İçin Kullanılacak
  dataTable: any;
  disableAdd=true;
  disableUpdate=true;
  alertShow=true;
  selectedProduct: Product;
  editedProduct: Product = new Product();
  constructor(
    private productsService: ProductsService,
    private errorService: ErrorService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getList();

  }

  // Ürünleri DataTable Eklentisi İle Listeleme İşlemi
  getList() {
    this.productsService.getList().subscribe((res: any) => {
      this.products = res.data;
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
            { extend: 'excel', title: 'Ürünler Tablosu Listesi' },
            { extend: 'pdf', title: 'Ürünler Tablosu Listesi' },
            {
              extend: 'print', title:"Ürünler Listesi",
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
  // *****************************************

  // Ürünleri Silme İşlemi
  delete(product:Product) {
    this.productsService.delete(product).subscribe((res:any)=>{
      this.toastrService.success(res.message);
      $('.dataTables-example').DataTable().destroy();
      setTimeout(() => {
    this.getList();
  }, 0);
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }
  // *****************************************

  // Ürünleri Ekleme İşlemi
  add(productName: HTMLInputElement) {
    let product: Product = new Product();
    product.name = productName.value;
    product.id = 0;

    this.productsService.add(product).subscribe((res:any) => {
      this.toastrService.success(res.message);
      $('.dataTables-example').DataTable().destroy();
      setTimeout(() => {
        this.getList();
        document.getElementById("addProductModal").click();
      }, 0);
    }, (err) => {
      this.errorService.errorHandler(err);
    });
  }

  // Ürünleri Ekleme İşlemi Yaparken Kontrol Sağlar
  checkAddValidity(productName: HTMLInputElement) {
    this.disableAdd = !productName.value.trim() || productName.value.trim().length < 3;
    this.alertShow = !productName.value.trim() || productName.value.trim().length < 3;
  }
  // *****************************************

 // Ürünleri Güncelleme İşlemi
getProduct(productModel: Product) {
  this.selectedProduct = { ...productModel };
  this.editedProduct = { ...productModel };

  this.productsService.getById(productModel.id).subscribe((res: any) => {
    this.selectedProduct = res.data;
    this.editedProduct = { ...res.data };
  }, (err) => {
    this.errorService.errorHandler(err);
  });
}

update() {
  this.productsService.update(this.editedProduct).subscribe((res: any) => {
    this.toastrService.success(res.message);
    $('.dataTables-example').DataTable().destroy();
    setTimeout(() => {
      this.getList();
      document.getElementById("updateProductModal").click();
    }, 0);
  }, (err) => {
    this.errorService.errorHandler(err);
  });
}

// Ürünleri Güncelleme İşlemi Yaparken Kontrol Sağlar
public checkUpdateValidity(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.value.trim().length < 3 || inputElement.value.trim() === '') {
    this.alertShow = true;
    this.disableUpdate = true;
  } else {
    this.alertShow = false;
    this.disableUpdate = false;
  }
}
 // *****************************************



}
