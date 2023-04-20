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

 getUserId():number{ //Tokenden kullanıcının Idsini alıyoruz
  let decode = this.jwtHelper.decodeToken(localStorage.getItem("adminToken"));
  var userId = Object.keys(decode).filter(x=>x.endsWith("/nameidentifier"))[0];
  return +decode[userId];
}

getUserName():string{ //Tokenden kullanıcının Adını alıyoruz
  let decode = this.jwtHelper.decodeToken(localStorage.getItem("adminToken"));
  var userName = Object.keys(decode).filter(x=>x.endsWith("/name"))[0];
  return decode[userName];
}

getUserRole(){ //Tokenden kullanıcının rolünü alıyoruz
  this.roles = [];
  let decode = this.jwtHelper.decodeToken(localStorage.getItem("adminToken"));
  var userRoles = Object.keys(decode).filter(x=>x.endsWith("/role"));
  userRoles.forEach(element => {
    let model: AdminRoles = new AdminRoles();
    model.role=decode[element]
    this.roles.push(model);
  });
  return this.roles;
}
}
