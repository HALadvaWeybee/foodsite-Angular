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
    console.log("cartlist", obj);
    
     if(this.cartList.length==0 || (this.cartList.findIndex((ele) => ele?.data?.id == obj.id)==-1 && this.cartList.length!=0)) {
       this.cartList.push({
         data:obj,
         quantity:1
       });
       this.setInLocalStorage();   
       this.productList.next(this.cartList);
       
      } else {        
        this.deleteFromCartList(obj?.id);
      }
      this.setInLocalStorage();
  }
  
  deleteFromCartList(id:string) {
    this.cartList = this.cartList.filter((ele:any) => ele?.data?.id!=id);
    this.setInLocalStorage()
    this.productList.next(this.cartList);
    // if(this.wishList.length ==1) this.wishList = [];
  }
  getCartListCount() {
     return this.productList.asObservable();
  }

  setInLocalStorage() {
    localStorage.setItem('cartList', JSON.stringify([...this.cartList])); 
  }
}
