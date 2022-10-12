import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-foodinfo', 
  templateUrl: './foodinfo.component.html',
  styleUrls: ['./foodinfo.component.scss']
})
export class FoodinfoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private homeService:HomeService, private wishService: WishlistService, private cartService:CartService) { }
  id:any;
  slug:any;
  data:any[] =[];
  index:number = -1;
  cartMsg:boolean = false;
  wishMsg:boolean = false;
  printDetail:any;
  productCount:number=1;

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.data = await this.homeService.getSpecifyFood(this.slug, this.id);
    this.printDetail = this.data[0];  
    if(this.homeService.resentFood.length < 5) this.homeService.resentFood.push(this.printDetail)
  }

  add() {
    this.productCount++;
  }
  sub() {
    if(this.productCount>0)
      this.productCount--;
  }

  addToWishList() {
    this.wishService.addFoodToWishList(this.printDetail);
    this.wishMsg = true;
    setTimeout(() => {
      this.wishMsg = false;
    }, 2000);
  }

  addToCartList() {
    this.cartService.addFoodToCartList(this.printDetail);
    this.cartMsg = true;
    setTimeout(() => {
      this.cartMsg = false;
    }, 2000);
  }

}
