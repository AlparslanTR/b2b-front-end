import { ErrorService } from 'src/app/services/error.service';
import { Component } from '@angular/core';
import { Customer } from './models/customer';
import { CustomerService } from './services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { PriceListService } from '../price-list/services/price-list.service';
import { PriceList } from '../price-list/models/priceList';
import { CustomerRelation } from './models/customerRelation';

declare var $: any;
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  customer : Customer = new Customer();
  customers: Customer[] = [];
  // filterText:string=""; // Pipe İçin Kullanılacak
  dataTable: any;
  disableAdd=true;
  disableUpdate=true;
  nameAlertShow=true;
  emailAlertShow=true;
  passwordAlertShow=true;
  selectedCustomer: Customer []=[]
  editedCustomer: Customer = new Customer();
  priceLists:PriceList[]=[];
  disableUpdateRelations=true;
  constructor(
    private customerService: CustomerService,
    private errorService: ErrorService,
    private toastrService:ToastrService,
    private priceListService:PriceListService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.getPriceList();
  }


  // Müşterileri DataTable Eklentisi İle Listeleme İşlemi
  getList() {
    this.customerService.getList().subscribe((res: any) => {
      this.customers = res.data;
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
            { extend: 'excel', title: 'Müşteri Tablosu Listesi' },
            { extend: 'pdf', title: 'Müşteri Tablosu Listesi' },
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

  // Müşterilerin Fiyat Listelerini Getir
  getPriceList(){
    this.priceListService.getList().subscribe((res:any)=>{
      this.priceLists=res.data;
      console.log(res.data);
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }
  // *****

  // Müşterileri Ekleme İşlemi
 add(customerName: HTMLInputElement,
      customerEmail:HTMLInputElement,
      customerPassword:HTMLInputElement
    ) {
    this.customer.name = customerName.value;
    this.customer.email=customerEmail.value;
    this.customer.password=customerPassword.value;
    this.customer.id = 0;

    this.customerService.add(this.customer).subscribe((res:any) => {
      this.toastrService.success(res.message);
      $('.dataTables-example').DataTable().destroy();
      setTimeout(() => {
        this.getList();
        document.getElementById("addCustomerModal").click();
      }, 0);
    }, (err) => {
      this.errorService.errorHandler(err);
    });
  }

  // Müşteri Ekleme Yaparken Kontrol Sağlar
  checkAddNameValidity(customerName: HTMLInputElement) {
    if (!customerName.value.trim() || customerName.value.trim().length < 2) {
      this.disableAdd = true;
      this.nameAlertShow = true;
    } else {
      this.disableAdd = false;
      this.nameAlertShow = false;
    }
  }

  checkAddEmailValidity(customerEmail: HTMLInputElement) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!customerEmail.value.trim() || !emailRegex.test(customerEmail.value)) {
      this.disableAdd = true;
      this.emailAlertShow = true;
    } else {
      this.disableAdd = false;
      this.emailAlertShow = false;
    }
  }

  checkAddPasswordValidity(customerPassword: HTMLInputElement) {
    if (!customerPassword.value.trim() || customerPassword.value.trim().length < 6 || !/[a-z]/.test(customerPassword.value) || !/[A-Z]/.test(customerPassword.value)) {
      this.disableAdd = true;
      this.passwordAlertShow = true;
    } else {
      this.disableAdd = false;
      this.passwordAlertShow = false;
    }

  }

  // ********************************************


// Müşterileri Güncelleme İşlemi
getCustomer(customer: Customer){
  this.customerService.getCustomerById(customer.id).subscribe((res: any)=>{
    this.customer = res.data;
    console.log(res.data);
  },(err)=>{
    this.errorService.errorHandler(err);
  });
}

update() {
  this.customerService.update(this.editedCustomer).subscribe((res: any) => {
    this.toastrService.success(res.message);
    $('.dataTables-example').DataTable().destroy();
    setTimeout(() => {
      this.getList();
      document.getElementById("updateCustomerModal").click();
    }, 0);
  }, (err) => {
    this.errorService.errorHandler(err);
  });
}

// Müşterileri Güncelleme İşlemi Yaparken Kontrol Sağlar
public checkUpdateValidity(): void {
  this.disableUpdate = false;

  if (this.editedCustomer.name.length < 2 || this.editedCustomer.name === '') {
    this.nameAlertShow = true;
    this.disableUpdate = true;
  } else {
    this.nameAlertShow = false;
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (this.editedCustomer.email === '' || !emailRegex.test(this.editedCustomer.email)) {
    this.emailAlertShow = true;
    this.disableUpdate = true;
  } else {
    this.emailAlertShow = false;
  }

  if (this.editedCustomer.password === '' || this.editedCustomer.password.trim().length < 6 || !/[a-z]/.test(this.editedCustomer.password) || !/[A-Z]/.test(this.editedCustomer.password)) {
    this.passwordAlertShow = true;
    this.disableUpdate = true;
  } else {
    this.passwordAlertShow = false;
  }
}

 // *********************************************


// Müşterileri Silme İşlemi
delete(customer:Customer) {
  this.customerService.delete(customer).subscribe((res:any)=>{
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

// Müşterileri Bağlantısını Güncelle
updateRelationShip(){
  let model : CustomerRelation= new CustomerRelation();
  model.customerId=this.customer.id;
  model.priceListId=this.customer.priceListId;
  model.discount=this.customer.discount;

  this.customerService.updateRelation(model).subscribe((res:any)=>{
    this.toastrService.success(res.message);
    $('.dataTables-example').DataTable().destroy();
    setTimeout(() => {
      this.getList();
      document.getElementById("updateCustomerRelationShipModal").click();
    }, 0);
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}



}
