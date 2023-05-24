import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { OrderDetailService } from './services/order-detail.service';
import { OrderDetail } from './models/orderDetail';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {

orderId:number=0;
orderDetails:OrderDetail[]=[];
orderDetail: OrderDetail = new OrderDetail();
order: Order = new Order();

constructor(
  private activatedRoute:ActivatedRoute,
  private errorService:ErrorService,
  private orderDetailService:OrderDetailService,
  private orderService:OrderService
){}


ngOnInit(){
  this.activatedRoute.params.subscribe((res:any)=>{
    this.orderId=res.id;
    this.getList();
    this.getOrder();
  })

}

getOrder(){
  this.orderService.getById(this.orderId).subscribe((res:any)=>{
    this.order=res.data;
    console.log(res.data);
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

getList(){
  this.orderDetailService.getList(this.orderId).subscribe((res:any)=>{
    this.orderDetails=res.data;
    console.log(res.data);
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

 printPage() {
  var printContent = document.getElementById("printableArea").innerHTML;
  var originalContent = document.body.innerHTML;
  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
}














}
