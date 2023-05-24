import { Component } from '@angular/core';
import { AdminDecodeService } from '../../login/services/admin-decode.service';
import { AdminRoles } from '../../login/models/adminRoles';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

userName : string = "";
userRole: AdminRoles[] = [];

constructor(private adminDecodeService:AdminDecodeService){ }


ngOnInit():void{
  this.userName=this.adminDecodeService.getCustomerName();
  this.userRole=this.adminDecodeService.getCustomerRole();
}
}
