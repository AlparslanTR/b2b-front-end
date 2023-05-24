import { ErrorService } from 'src/app/services/error.service';
import { Component } from '@angular/core';
import { OrderService } from './services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from './models/order';

declare var $:any

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  order : Order = new Order();
  orders: Order[] = [];
  // filterText:string=""; // Pipe İçin Kullanılacak
  dataTable: any;
  selectedOrder: Order []=[]
  editedOrder: Order = new Order();
  disableUpdateRelations=true;
  cancelledStatus:string="Reddedildi";
  acceptedStatus:string="Tamamlandı";



  constructor(
    private errorService:ErrorService,
    private toastrService:ToastrService,
    private orderService:OrderService
  ){ }

  ngOnInit():void{
    this.getList();
  }

  // Siparişleri DataTable Eklentisi İle Listeleme İşlemi
  getList() {
    this.orderService.getListWithDto().subscribe((res: any) => {
      this.orders = res.data;
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
            { extend: 'excel', title: 'Sipariş Tablosu Listesi' },
            { extend: 'pdf', title: 'Sipariş Tablosu Listesi' },
            {
              extend: 'print', title:"Sipariş Listesi",
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


  accept(order:Order){
    order.status=this.acceptedStatus;
    this.orderService.update(order).subscribe((res: any) => {
      this.toastrService.success("Sipariş Tamamlandı.!","İşlem Başarılı.!");
      $('.dataTables-example').DataTable().destroy();
      setTimeout(() => {
        this.getList();
      }, 0);
    }, (err) => {
      this.errorService.errorHandler(err);
    });
  }

  cancelled(order:Order){
    order.status=this.cancelledStatus;
    this.orderService.update(order).subscribe((res: any) => {
      this.toastrService.info("Sipariş Reddedildi.!","İşlem Başarılı.!");
      this.cancelledStatus=res.data;
      $('.dataTables-example').DataTable().destroy();
      setTimeout(() => {
        this.getList();
      }, 0);
    }, (err) => {
      this.errorService.errorHandler(err);
    });
  }

}
