import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

constructor(
  @Inject('apiPath') private apiPath:string,
  private http:HttpClient
) { }


getList(){
  let api = this.apiPath+"Orders/GetList";
  return this.http.get(api);
}

delete(order:Order){
  let api = this.apiPath+"Orders/Delete";
  return this.http.post(api,order);
}

add(order:Order){
  let api = this.apiPath+"Orders/Add";
  return this.http.post(api,order);
}

update(order:Order){
  let api = this.apiPath+"Orders/Update";
  return this.http.post(api,order);
}

getById(id:number){
  let api = this.apiPath+"Orders/GetByIdDto/"+id;
  return this.http.get(api);
}

getListWithDto(){
  let api = this.apiPath+"Orders/GetListWithOrderDto";
  return this.http.get(api);
}

}
