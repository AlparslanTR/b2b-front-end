import { Customer } from './../../customers/models/customer';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { ClaimsService } from './services/claims.service';
import { CustomerService } from '../../customers/services/customer.service';
import { Claim } from './models/claim';
import { CustomerClaims } from './models/customerClaims';

declare var $: any;

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent {
  errorService=inject(ErrorService);
  toastrService=inject(ToastrService);
  claimService=inject(ClaimsService);
  customerService=inject(CustomerService);

  customer:Customer = new Customer();
  customers : Customer[]=[];

  claims:Claim[]=[];
  claim : Claim = new Claim();

  customerClaim: CustomerClaims= new CustomerClaims();
  customerClaims: CustomerClaims[]=[];

  disableAdd=true;
  alertShow=true;



  ngOnInit(){
    this.getList();
    this.getListClaims();
  }

  getList() {
    this.claimService.getListCustomersClaims().subscribe((res: any) => {
      this.customerClaims = res.data;
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

  getListClaims(){
    this.claimService.getList().subscribe((res:any)=>{
      this.claims=res.data;
      console.log(res.data);
    })
  }

  getListCustomer(customer: Customer){
    this.customerService.getCustomerById(customer.id).subscribe((res: any)=>{
      this.customer = res.data;
      console.log(res.data);
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }

  add(claimName: HTMLInputElement) {
    let claim: Claim = new Claim();
    claim.name = claimName.value;
    claim.id = 0;

    this.claimService.add(claim).subscribe((res:any) => {
      this.toastrService.success(res.message);
        document.getElementById("addClaimModal").click();
    }, (err) => {
      this.errorService.errorHandler(err);
    });
  }

  checkAddValidity(claimName: HTMLInputElement) {
    this.disableAdd = !claimName.value.trim() || claimName.value.trim().length < 3;
    this.alertShow = !claimName.value.trim() || claimName.value.trim().length < 3;
  }

  addCustomerClaim() {
    let model : CustomerClaims=new CustomerClaims();
    model.customerId=this.customerClaim.customerId
    model.operationClaimId=this.claim.id
    this.claimService.addCustomerClaims(model).subscribe((res: any) => {
      this.toastrService.success(res.message);
      document.getElementById("updateClaimByCustomerModal").click();
      this.getList();
    }, (err) => {
      this.errorService.errorHandler(err);
    });
  }

  selectCustomer(customerId: number) {
    this.customerClaim.customerId = customerId;
  }


}
