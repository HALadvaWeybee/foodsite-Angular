import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'foodsite';
  wishListCount:number= 0;
  cartListCount:number= 0;

  constructor(private _wishService: WishlistService, private _cartService: CartService) {    
  }

  ngOnInit(): void {
     this._wishService.getWishListCount().subscribe((res) => {
       console.log("res.length", res.length);
       if(res.length ==0) {
          this.wishListCount = res.length;
       } else {
         this.wishListCount = res.length || ((JSON.parse(localStorage.getItem('wishList')|| '[]'))).length;
       }
        // this.wishListCount = res.length;
     });
     this._cartService.getCartListCount().subscribe((res) => {
       this.cartListCount = res.length || ((JSON.parse(localStorage.getItem('cartList') || ''))).length;
      //  this.cartListCount = res.length ;
     })
  }
}
