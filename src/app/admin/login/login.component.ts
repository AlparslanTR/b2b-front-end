import { Component } from '@angular/core';
import { AdminLogin } from './models/adminLogin';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  currentYear: number = new Date().getFullYear();
  adminLogin: AdminLogin = new AdminLogin();
  constructor(private authService:AuthService){ }

  ngOnInit():void{

  }

  login(loginForm:any){
    this.adminLogin=loginForm;
    this.authService.login(this.adminLogin);
  }
}
