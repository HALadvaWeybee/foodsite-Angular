import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
}) 
export class WishlistService {

  wishList:any[] =[];
  productList = new BehaviorSubject<any>([]);

  constructor() { 
    const _wishData = localStorage.getItem('wishList');
    if(_wishData)
     this.wishList = (JSON.parse(_wishData))
  }

  addFoodToWishList(obj:any) {
     if(this.wishList.length==0 || (this.wishList.indexOf(obj)==-1 && this.wishList.length!=0)) {
       this.wishList.push(obj);
       this.productList.next(this.wishList);
       this.setInLocalStorage();   
      } else {
        this.deleteFromWishList(obj?.id);
      }
  }
  
  deleteFromWishList(id:string) {
    this.wishList = this.wishList.filter((ele:any) => ele.id!=id);
    this.productList.next(this.wishList);
    if(this.wishList.length ==1) this.wishList = [];
    this.setInLocalStorage()
  }
  getWishListCount() {
    return this.productList.asObservable();
  }

  setInLocalStorage() {
    localStorage.setItem('wishList', JSON.stringify([...this.wishList])); 
  }
}
