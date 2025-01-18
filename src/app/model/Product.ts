export interface APIResponseModel{
    message: string,
    result: boolean,
    data:any
}
export interface Category{
    categoryId: number,
    categoryName: string,
    parentCategoryId:any,
    userId:number
}
export class Customer{
   custId:number;
   name:string;
   MobileNo:string;
   Password:string;

   constructor(){
      this.custId = 0;
      this.name = '';
      this.MobileNo = '';
      this.Password = '';
   }
}
export class LoginModel{
   UserName:string;
   UserPassword:string;

   constructor(){
      this.UserName = '';
      this.UserPassword = '';
   }
}
export class CardModel{
   CartId:number;
   custId:number;
   ProductId:number;
   Quantity:number;
   AddedDate:Date;

   constructor(){
      this.CartId = 0;
      this.custId = 0;
      this.ProductId = 0;
      this.Quantity = 1;
      this.AddedDate = new Date();
   }
}

export interface ProductList {
    productId: number
    productSku: string
    productName: string
    productPrice: number
    productShortName: string
    productDescription: string
    createdDate: string
    deliveryTimeSpan: string
    categoryId: number
    productImageUrl: string
    categoryName: string
  }
export interface CardData {
    cartId: number
    custId: number
    productId: number
    quantity: number
    productShortName: string
    addedDate: string
    productName: string
    categoryName: string
    productImageUrl: string
    productPrice: number
  }
  