import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductImage } from '../models/productImage';

@Injectable({
  providedIn: 'root'
})
export class ProductImagesServiceService {

  constructor(
    @Inject('apiPath') private apiPath:string,
    private http:HttpClient
  ) { }


  add(formData:any){
    let api = this.apiPath+"ProductImages/Add";
    return this.http.post(api,formData);
  }

  getList(id:number){
    let api = this.apiPath+"ProductImages/GetListByProductId/"+id;
    return this.http.get(api);
  }

  delete(productImage:ProductImage){
    let api = this.apiPath+"ProductImages/Delete";
    return this.http.post(api,productImage);
  }

  setMainImage(id:number){
    let api = this.apiPath+"ProductImages/SetMainImage/"+id;
    return this.http.get(api);
  }

  }
