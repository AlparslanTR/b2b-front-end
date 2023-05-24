import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

constructor(
  @Inject('apiPath') private apiPath:string,
  private http:HttpClient
) { }

getList(){
  let api = this.apiPath+"Users/GetList";
  return this.http.get(api);
}

delete(user:User){
  let api = this.apiPath+"Users/Delete";
  return this.http.post(api,user);
}

}
