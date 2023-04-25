import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PriceList } from '../models/priceList';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  constructor(
    @Inject('apiPath') private apiPath:string,
    private http:HttpClient
  ) { }

  getList(){
    let api = this.apiPath+"PriceLists/GetList";
    return this.http.get(api);
  }

  delete(priceList:PriceList){
    let api = this.apiPath+"PriceLists/Delete";
    return this.http.post(api,priceList);
  }

  add(priceList:PriceList){
    let api = this.apiPath+"PriceLists/Add";
    return this.http.post(api,priceList);
  }

  update(priceList:PriceList){
    let api = this.apiPath+"PriceLists/Update";
    return this.http.post(api,priceList);
  }

  getById(id:number){
    let api = this.apiPath+"PriceLists/GetById/"+id;
    return this.http.get(api);
  }
}
