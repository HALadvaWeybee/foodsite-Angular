import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartList:any[] =[];

  constructor() { 
    const _cartData = localStorage.getItem('cartList');
    if(_cartData)
    this.cartList = (JSON.parse(_cartData))
  }
  productList = new BehaviorSubject<any>([]);

  addFoodToCartList(obj:any) {
    if(this.cartList.length==0 || (this.cartList.indexOf(obj)==-1 && this.cartList.length!=0)) {
      this.cartList.push(obj);
      this.productList.next(this.cartList);
      this.setInLocalStorage();   
     } else {
       this.deleteFromCartList(obj?.id);
     }
    // if(this.cartList.length==0) {
    //   this.cartList.push(obj);
    // } else {
    //   if(this.cartList.indexOf(obj)!=-1) {
    //     this.cartList = this.cartList.filter((ele:any) => ele.id != obj.id)
    //     if(this.cartList.length == 2) this.cartList = [];
    //   } else {
    //    this.cartList.push(obj);
    //   }
    // }
    // this.productList.next(this.cartList);
    // this.setInLocalStorage();   
  }

  deleteFromCartList(id:string) {
    this.cartList = this.cartList.filter((ele:any) => ele.id!=id);
    this.productList.next(this.cartList);
    if(this.cartList.length ==1) this.cartList = [];
    this.setInLocalStorage()    
  }
  getCartListCount() {
     return this.productList.asObservable();
  }

  setInLocalStorage() {
    localStorage.setItem('cartList', JSON.stringify([...this.cartList])); 
  }
}
