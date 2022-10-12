import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { HomeService } from '../services/home.service';
import { WishlistService } from '../services/wishlist.service';
import { JsLoader } from '../shared/js-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private wishService:WishlistService, private cartService:CartService) {
    const _resentData = localStorage.getItem('resentFood');
    if(_resentData)
     this.resentFood = (JSON.parse(_resentData))
   }
  data:any;
  recommendedForYou:any[] =[];
  resentFood:any[]=[];
  listOfFood:any[] =[];
  count:number = 0;
  cartMsg:boolean = false;
  wishMsg:boolean = false;
  cartMsg1:boolean = false;
  wishMsg1:boolean = false;

  async ngOnInit() {
    JsLoader.sliderJs();
    this.data = await this.homeService.getBestForYou();
    this.recommendedForYou = this.data; 
  }

  addToWishList(id: string) {
    const index = this.recommendedForYou.findIndex((ele: any) => ele.id == id);
     this.wishService.addFoodToWishList(this.recommendedForYou[index]);

     this.wishMsg = true;
    setTimeout(() => {
      this.wishMsg = false;
    }, 1500);
  }

  addToCartList(id: string) {
    const index = this.recommendedForYou.findIndex((ele: any) => ele.id == id);
    this.cartService.addFoodToCartList(this.recommendedForYou[index], 1);
    this.cartMsg = true;
    setTimeout(() => {
      this.cartMsg = false;
    }, 1500);
  }
  addToWishList1(id: string) {
    const index = this.resentFood.findIndex((ele: any) => ele.id == id);
     this.wishService.addFoodToWishList(this.resentFood[index]);
     this.wishMsg1 = true;
    setTimeout(() => {
      this.wishMsg1 = false;
    }, 1500);
  }

  addToCartList1(id: string) {
    const index = this.resentFood.findIndex((ele: any) => ele.id == id);
    this.cartService.addFoodToCartList(this.resentFood[index], 1);
    this.cartMsg1 = true;
    setTimeout(() => {
      this.cartMsg1 = false;
    }, 1500);
  }

}
