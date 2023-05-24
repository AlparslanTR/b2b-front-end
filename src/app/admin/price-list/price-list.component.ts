import { Component } from '@angular/core';
import { PriceList } from './models/priceList';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { PriceListService } from './services/price-list.service';

declare var $: any;
@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent {

  priceLists:PriceList[]=[];
  priceList : PriceList= new PriceList();
  // filterText:string=""; // Pipe İçin Kullanılacak
  dataTable: any;
  disableAdd=true;
  disableUpdate=true;
  alertShow=true;
  selectedPriceList: PriceList;
  editedPriceList: PriceList = new PriceList();

  constructor(
    private errorService:ErrorService,
    private toastrService:ToastrService,
    private priceListService:PriceListService
  ){ }

  ngOnInit():void{
    this.getList();
  }

  // Fiyat Listeleri DataTable Eklentisi İle Listeleme İşlemi
  getList() {
    this.priceListService.getList().subscribe((res: any) => {
      this.priceLists = res.data;
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
            { extend: 'excel', title: 'Fiyat Listesi Tablosu ' },
            { extend: 'pdf', title: 'Fiyat Listesi Tablosu' },
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

  // Fiyat Listeleri Silme İşlemi
  delete(priceLists:PriceList) {
    this.priceListService.delete(priceLists).subscribe((res:any)=>{
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

  // Fiyat Listeleri Ekleme İşlemi
  add(priceLists: HTMLInputElement) {
    let priceList: PriceList = new PriceList();
    priceList.name = priceLists.value;
    priceList.id = 0;

    this.priceListService.add(priceList).subscribe((res:any) => {
      this.toastrService.success(res.message);
      $('.dataTables-example').DataTable().destroy();
      setTimeout(() => {
        this.getList();
        document.getElementById("addpriceListModal").click();
      }, 0);
    }, (err) => {
      this.errorService.errorHandler(err);
    });
  }

  // Fiyat Listeleri Ekleme İşlemi Yaparken Kontrol Sağlar
  checkAddValidity(priceLists: HTMLInputElement) {
    this.disableAdd = !priceLists.value.trim() || priceLists.value.trim().length < 3;
    this.alertShow = !priceLists.value.trim() || priceLists.value.trim().length < 3;
  }
  // *****************************************

 // Fiyat Listeleri Güncelleme İşlemi
getPriceList(priceList: PriceList) {
  this.selectedPriceList = { ...priceList };
  this.editedPriceList = { ...priceList };

  this.priceListService.getById(priceList.id).subscribe((res: any) => {
    this.selectedPriceList = res.data;
    this.editedPriceList = { ...res.data };
  }, (err) => {
    this.errorService.errorHandler(err);
  });
}

update() {
  this.priceListService.update(this.editedPriceList).subscribe((res: any) => {
    this.toastrService.success(res.message);
    $('.dataTables-example').DataTable().destroy();
    setTimeout(() => {
      this.getList();
      document.getElementById("updatepriceListModal").click();
    }, 0);
  }, (err) => {
    this.errorService.errorHandler(err);
  });
}

// Fiyat Listeleri Güncelleme İşlemi Yaparken Kontrol Sağlar
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
