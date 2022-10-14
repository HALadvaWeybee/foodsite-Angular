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
     this.resentFood.forEach(ele  => {
      this.wishService.wishList.findIndex(e => e.id == ele.id)==-1 ? ele.isInWishList= false:ele.isInWishList= true;
      this.cartService.cartList.findIndex(e => e.id == ele.id)==-1 ? ele.isInCartList= false:ele.isInCartList= true;
    })
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
  message:string[] = ['Add to ', 'Remove From '];
  isProductInCart:boolean = false;
  isProductInWish:boolean = false;
  isProductInCart1:boolean = false;
  isProductInWish1:boolean = false;

  async ngOnInit() {
    JsLoader.sliderJs();
    this.data = await this.homeService.getBestForYou();
    this.recommendedForYou = this.data;
    this.recommendedForYou.forEach(ele  => {
      this.wishService.wishList.findIndex(e => e.id == ele.id)==-1 ? ele.isInWishList= false:ele.isInWishList= true;
      this.cartService.cartList.findIndex(e => e.id == ele.id)==-1 ? ele.isInCartList= false:ele.isInCartList= true;
    })
  }

  addToWishList(id: string) {
    const index = this.recommendedForYou.findIndex((ele: any) => ele.id == id);
     this.wishService.addFoodToWishList(this.recommendedForYou[index]);
     this.recommendedForYou[index].isInWishList = !this.recommendedForYou[index].isInWishList;
     this.isProductInWish =this.recommendedForYou[index].isInWishList;
     this.wishMsg = true;
    setTimeout(() => {
      this.wishMsg = false;
    }, 1500);
  }

  addToCartList(id: string) {
    const index = this.recommendedForYou.findIndex((ele: any) => ele.id == id);
    this.cartService.addFoodToCartList(this.recommendedForYou[index], 1);
    this.recommendedForYou[index].isInCartList = !this.recommendedForYou[index].isInCartList;
    this.isProductInCart =this.recommendedForYou[index].isInCartList;
    this.cartMsg = true;
    setTimeout(() => {
      this.cartMsg = false;
    }, 1500);
  }
  addToWishList1(id: string) {
    const index = this.resentFood.findIndex((ele: any) => ele.id == id);
     this.wishService.addFoodToWishList(this.resentFood[index]);
     this.resentFood[index].isInWishList = !this.resentFood[index].isInWishList;
     this.isProductInWish1 =this.resentFood[index].isInWishList;
     this.wishMsg1 = true;
    setTimeout(() => {
      this.wishMsg1 = false;
    }, 1500);
  }

  addToCartList1(id: string) {
    const index = this.resentFood.findIndex((ele: any) => ele.id == id);
    this.cartService.addFoodToCartList(this.resentFood[index], 1);
    this.resentFood[index].isInCartList = !this.resentFood[index].isInCartList; 
    this.isProductInCart1 =this.resentFood[index].isInCartList;
    this.cartMsg1 = true;
    setTimeout(() => {
      this.cartMsg1 = false;
    }, 1500);
  }

}
