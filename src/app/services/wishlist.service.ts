import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }
  wishList:any[] =[];

  addFoodToWishList(obj:any) {
     this.wishList = this.wishList.filter((ele:any) => ele.id != obj.id)
     this.wishList.push(obj);
     this.getWishListCount();
     console.log("this wishlist", this.wishList);
  }
  
  getWishListCount() {
     console.log("this wishlist", this.wishList.length);
     
     return this.wishList.length;
  }
}
