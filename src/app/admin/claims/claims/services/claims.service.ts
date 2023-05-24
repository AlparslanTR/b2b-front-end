import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Claim } from '../models/claim';
import { CustomerClaims } from '../models/customerClaims';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  constructor(
    @Inject('apiPath') private apiPath:string,
    private http:HttpClient
    ) { }

    getList(){
      let api = this.apiPath+"OperationClaims/GetList";
      return this.http.get(api);
    }

    add(claim:Claim){
      let api = this.apiPath+"OperationClaims/Add";
      return this.http.post(api,claim);
    }

    getListCustomersClaims(){
      let api = this.apiPath+"CustomerOperationClaims/GetListDto";
      return this.http.get(api);
    }

    addCustomerClaims(customerClaim:CustomerClaims){
      let api = this.apiPath+"CustomerOperationClaims/Add";
      return this.http.post(api,customerClaim);
    }
}
