import { AdminToken } from './../models/adminToken';
import { AdminLogin } from './../models/adminLogin';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { concatMap, take, timer } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import jwtDecode from 'jwt-decode';
import { AdminDecodeService } from './admin-decode.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  adminToken: AdminToken = new AdminToken();
  adminLogin: AdminLogin = new AdminLogin();
  constructor
  (
    @Inject('apiPath') private apiPath:string,
    private http:HttpClient,
    private router:Router,
    private toastr: ToastrService,
    private errorService:ErrorService,
    private adminDecodeService:AdminDecodeService
  ) { }

  isAuthenticate(){
    if (localStorage.getItem("adminToken")) {
        return true;
    }
    return false;
  }

  login(AdminLogin: AdminLogin){
    let api = this.apiPath+"Auth/UserLogin";

    this.toastr.info("Kullanıcı Mailiniz ve Şifreniz Kontrol Ediliyor Lütfen Bekleyiniz.!","Giriş Kontrolü.!",{timeOut:2000}as Partial<IndividualConfig>);

    // 3 saniye beklemek için timer kullanılıyor
    timer(3000)
      .pipe(
        // sadece bir kez concatMap çağırmak için take(1) kullanılıyor
        take(1),
        concatMap(() => this.http.post(api,AdminLogin))
      )
      .subscribe((x:any) => {
        this.adminToken= x.data
        localStorage.setItem("adminToken",this.adminToken.adminAccessToken);
        this.router.navigate(["/admin"]);
        this.toastr.success("Giriş Yapıldı Hoşgeldiniz "+this.adminDecodeService.getUserName(),"Hoşgeldiniz");
      },(err:any) => {
        this.errorService.errorHandler(err);
      })
  }

  logOut(){
    localStorage.removeItem("adminToken");
    this.router.navigate(["/admin-login"]);
    this.toastr.success("Çıkış Başarılı");
  }

}
