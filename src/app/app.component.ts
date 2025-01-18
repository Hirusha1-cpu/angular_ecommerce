import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { APIResponseModel, Customer, LoginModel } from './model/Product';
import { MasterService } from './service/master.service';
import { Constant } from './constants/constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'project';
  registerObj: Customer = new Customer();
  masterService = inject(MasterService)
  loggedUserData: Customer = new Customer();
  loginObj: LoginModel = new LoginModel();
  @ViewChild("registerModel") registerModel: ElementRef | undefined;
  @ViewChild("loginModel") loginModel: ElementRef | undefined;

  ngOnInit(): void {
      const isUser = localStorage.getItem(Constant.LOCAL_KEY)
      if (isUser != null) {
        const parseObj = JSON.parse(isUser);
        this.loggedUserData = parseObj;
      }
  }
  openRegisterModel(){
    if(this.registerModel){
      this.registerModel.nativeElement.style.display = "block"
    }
  }
  closeRegisterModel(){
    if(this.registerModel){
      this.registerModel.nativeElement.style.display = "none"
    }
  }
  openLoginModel(){
    if(this.loginModel){
      this.loginModel.nativeElement.style.display = "block"
    }
  }
  closeLoginModel(){
    if(this.loginModel){
      this.loginModel.nativeElement.style.display = "none"
    }
  }
  openRegister(){
    debugger;
    this.masterService.registerNewCustomer(this.registerObj).subscribe((res:APIResponseModel)=>{
      if (res.result) {
        alert("Registration Success")
        this.closeRegisterModel()
      }else{
        alert(res.message)
      }
    })
  }
  openLogin(){
    debugger;
    this.masterService.openLogin(this.loginObj).subscribe((res:APIResponseModel)=>{
      if (res.result) {
        this.loggedUserData = res.data
        alert(`Login Success ${res.result}`)
        localStorage.setItem(Constant.LOCAL_KEY,JSON.stringify(res.data))
        this.closeLoginModel()
      }else{
        alert(res.message)
      }
    })
  }
  logoff(){
    localStorage.removeItem(Constant.LOCAL_KEY)
    this.loggedUserData = new Customer();
  }

  
}

