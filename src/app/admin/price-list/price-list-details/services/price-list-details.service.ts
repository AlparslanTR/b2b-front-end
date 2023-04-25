import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PriceListDetails } from '../models/priceListDetails';

@Injectable({
  providedIn: 'root'
})
export class PriceListDetailsService {

  constructor(
    @Inject('apiPath') private apiPath:string,
    private http:HttpClient
  ) { }

  getList(priceListId:number){
    let api = this.apiPath+"PriceListDetails/GetByProductName/"+priceListId;
    return this.http.get(api);
  }

  delete(priceListDetail:PriceListDetails){
    let api = this.apiPath+"PriceListDetails/Delete";
    return this.http.post(api,priceListDetail);
  }

  add(priceListDetail:PriceListDetails){
    let api = this.apiPath+"PriceListDetails/Add";
    return this.http.post(api,priceListDetail);
  }

  getById(id:number){
    let api = this.apiPath+"PriceListDetails/GetById/"+id;
    return this.http.get(api);
  }
}
