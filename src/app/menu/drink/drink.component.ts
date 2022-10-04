import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {

  constructor(private homeService: HomeService, private wishService:WishlistService, private cartService: CartService) { }
  data:any;
  drinks:any[] =[];
  async ngOnInit() {
    this.drinks = await this.homeService.getAllDrinks();
  }

  addToWishList(id:string) {
    const index = this.drinks.findIndex((ele:any) => ele.id == id);
    this.wishService.addFoodToWishList(this.drinks[index])
 }

 addToCartList(id:string) {
  const index = this.drinks.findIndex((ele:any) => ele.id == id);
  this.cartService.addFoodToCartList(this.drinks[index]);
 }
}
