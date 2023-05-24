import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { PriceListDetailsService } from './services/price-list-details.service';
import { PriceListDetails } from './models/priceListDetails';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products/services/products.service';
import { Product } from '../../products/models/product';
import { NgForm } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-price-list-details',
  templateUrl: './price-list-details.component.html',
  styleUrls: ['./price-list-details.component.css']
})

export class PriceListDetailsComponent implements OnInit {

  products: Product[]=[];
  priceListsDetails:PriceListDetails[]=[];
  priceListDetail : PriceListDetails= new PriceListDetails();
  // filterText:string=""; // Pipe İçin Kullanılacak
  dataTable: any;
  disableAdd=true;
  disableUpdate=true;
  alertShow=false;
  priceListId : number=0;


  constructor(
    private errorService:ErrorService,
    private toastrService:ToastrService,
    private priceListDetailService:PriceListDetailsService,
    private activatedRoute:ActivatedRoute,
    private productService:ProductsService
  ) { }


  ngOnInit():void{
    this.activatedRoute.params.subscribe((res:any)=>{
      this.priceListId = res.id;
      this.getList();
      this.getProductList();
    })
  }


  // Fiyat Liste Bilgisi DataTable Eklentisi İle Listeleme İşlemi
  getList() {
    this.priceListDetailService.getList(this.priceListId).subscribe((res: any) => {
      this.priceListsDetails = res.data;
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

  // Fiyat Liste Bilgisi Silme İşlemi
  delete(priceListDetail:PriceListDetails) {
    this.priceListDetailService.delete(priceListDetail).subscribe((res:any)=>{
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

  // Fiyat Liste Bilgisi Ekleme İşlemi
  add(addForm: NgForm) {
    let priceListDetail: PriceListDetails = new PriceListDetails();
    priceListDetail.productId = addForm.value.productId;
    priceListDetail.price = addForm.value.price;
    priceListDetail.priceListId = this.priceListId;
    priceListDetail.id=0;

    this.priceListDetailService.add(priceListDetail).subscribe((res:any) => {
      this.toastrService.success(res.message);
      $('.dataTables-example').DataTable().destroy();
      setTimeout(() => {
        this.getList();
        document.getElementById("addpriceListDetailModal").click();
      }, 0);
    }, (err) => {
      this.errorService.errorHandler(err);
    });
  }
  // *****************************************

// Fiyat Liste Bilgisi Ekleme Yaparken Ürünleri Getir
getProductList(){
  this.productService.getList().subscribe((res:any)=>{
    this.products=res.data;
  },(err)=>{
    this.errorService.errorHandler(err);
  });
}
 // *****************************************

}
