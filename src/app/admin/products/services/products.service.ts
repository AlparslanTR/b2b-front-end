import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

constructor(
  @Inject('apiPath') private apiPath:string,
  private http:HttpClient
) { }


getList(){
  let api = this.apiPath+"Products/GetList";
  return this.http.get(api);
}

delete(product:Product){
  let api = this.apiPath+"Products/Delete";
  return this.http.post(api,product);
}

add(product:Product){
  let api = this.apiPath+"Products/Add";
  return this.http.post(api,product);
}

update(product:Product){
  let api = this.apiPath+"Products/Update";
  return this.http.post(api,product);
}

getById(id:number){
  let api = this.apiPath+"Products/GetById/"+id;
  return this.http.get(api);
}

}
