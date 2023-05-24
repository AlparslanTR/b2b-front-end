import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OrderDetail } from '../models/orderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(
    @Inject('apiPath') private apiPath:string,
    private http:HttpClient
  ) { }


  getList(orderId:number){
    let api = this.apiPath+"OrderDetails/GetList/"+orderId;
    return this.http.get(api);
  }

}
