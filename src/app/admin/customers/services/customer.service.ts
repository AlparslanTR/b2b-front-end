import { CustomerRelation } from './../models/customerRelation';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
  @Inject('apiPath') private apiPath:string,
  private http:HttpClient
  ) { }


  getList(){
    let api = this.apiPath+"Customers/GetList";
    return this.http.get(api);
  }

  delete(customer:Customer){
    let api = this.apiPath+"Customers/Delete";
    return this.http.post(api,customer);
  }

  add(customer:Customer){
    let api = this.apiPath+"Customers/Add";
    return this.http.post(api,customer);
  }

  update(customer:Customer){
    let api = this.apiPath+"Customers/Update";
    return this.http.post(api,customer);
  }

  updateRelation(customerRelation:CustomerRelation){
    let api = this.apiPath+"CustomerRelationShips/Update";
    return this.http.post(api,customerRelation);
  }

  getById(id:number){
    let api = this.apiPath+"Customers/GetById/"+id;
    return this.http.get(api);
  }

  getCustomerById(id:number){
    let api = this.apiPath+"Customers/GetCustomerById/"+id;
    return this.http.get(api);
  }
}
