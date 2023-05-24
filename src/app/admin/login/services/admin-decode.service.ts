import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminRoles } from '../models/adminRoles';


@Injectable({
  providedIn: 'root'
})
export class AdminDecodeService {

jwtHelper: JwtHelperService = new JwtHelperService();
roles: AdminRoles[] = [];

constructor() { }

 getCustomerId():number{ //Tokenden Müşterinin Idsini alıyoruz
  let decode = this.jwtHelper.decodeToken(localStorage.getItem("CustomerToken"));
  var userId = Object.keys(decode).filter(x=>x.endsWith("/nameidentifier"))[0];
  return +decode[userId];
}

getCustomerName():string{ //Tokenden Müşterinin Adını alıyoruz
  let decode = this.jwtHelper.decodeToken(localStorage.getItem("CustomerToken"));
  var userName = Object.keys(decode).filter(x=>x.endsWith("/name"))[0];
  return decode[userName];
}

getCustomerRole(){ //Tokenden Müşterinin rolünü alıyoruz
  this.roles = [];
  let decode = this.jwtHelper.decodeToken(localStorage.getItem("CustomerToken"));
  var userRoles = Object.keys(decode).filter(x=>x.endsWith("/role"));
  userRoles.forEach(element => {
    let model: AdminRoles = new AdminRoles();
    model.role=decode[element]
    this.roles.push(model);
  });
  return this.roles;
}
}
