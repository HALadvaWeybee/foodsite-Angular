import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  cartList:any[] =[];

  addFoodToCartList(obj:any) {
    this.cartList = this.cartList.filter((ele:any) => ele.id != obj.id)
     this.cartList.push(obj);
     console.log("this wishlist", this.cartList);
  }
}
