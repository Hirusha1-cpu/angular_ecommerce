import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel, CardModel, Customer, LoginModel } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/BigBasket/';
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(this.apiUrl+"GetAllProducts")
  }
  getAllCategory(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(this.apiUrl+"GetAllCategory")
  }

  getAllProductsByCategoryId(categoryId: Number): Observable<APIResponseModel>{
    const url = `${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`;
    return this.http.get<APIResponseModel>(url)
  }
  registerNewCustomer(obj: Customer): Observable<APIResponseModel>{
    debugger;
    console.log(obj);
    
    const url = `${this.apiUrl}RegisterCustomer`;
    return this.http.post<APIResponseModel>(url,obj)
  }
  openLogin(obj: LoginModel): Observable<APIResponseModel>{
    debugger;
    const url = `${this.apiUrl}Login`;
    return this.http.post<APIResponseModel>(url,obj)
  }
  addToCart(obj: CardModel): Observable<APIResponseModel>{
    debugger;
    const url = `${this.apiUrl}AddToCart`;
    return this.http.post<APIResponseModel>(url,obj)
  }

  // GetCartProductsByCustomerId?id=2164
  getCartProductsByCustomerId(loggedUserID: Number): Observable<APIResponseModel>{
    const url = `${this.apiUrl}GetCartProductsByCustomerId?id=${loggedUserID}`;
    return this.http.get<APIResponseModel>(url)
  }

}
