import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { APIResponseModel, CardModel, Category, Customer, ProductList } from '../../model/Product';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Constant } from '../../constants/constant';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
addToCart(arg0: number) {
throw new Error('Method not implemented.');
}
    productList = signal<ProductList []>([]);
    subscriptionList: Subscription[] = [];
    categoryList: Observable<Category[]> = new Observable<Category[]>();
    masterService = inject(MasterService);
    loggedUserData: Customer  = new Customer()
    constructor(){
       const isUser = localStorage.getItem(Constant.LOCAL_KEY)
            if (isUser != null) {
              const parseObj = JSON.parse(isUser);
              this.loggedUserData = parseObj;
            }
    }
    ngOnInit(): void{
      this.loadAllProducts();
      this.categoryList = this.masterService.getAllCategory().pipe(
        map(item => item.data)
      )
    }
    getProductByCategory(id:number){
      this.masterService.getAllProductsByCategoryId(id).subscribe((res:APIResponseModel)=>{
        this.productList.set(res.data);
      })
    }
    loadAllProducts(){
     this.subscriptionList.push(this.masterService.getAllProducts().subscribe((res:APIResponseModel)=>{
        this.productList.set(res.data);
      }))
    }
    onAddToCart(id: number){
      const newObj : CardModel = new CardModel();
      newObj.ProductId = id
      newObj.CustId = this.loggedUserData.CustId
      this.masterService.addToCart(newObj).subscribe((res:APIResponseModel)=>{
        if(res.result){
          alert("Product added to cart")
        }else{
          alert(res.message)
        }
      })
    }
    ngOnDestroy(): void {
        this.subscriptionList.forEach(element=>{
          element.unsubscribe()
        })
    }
}


