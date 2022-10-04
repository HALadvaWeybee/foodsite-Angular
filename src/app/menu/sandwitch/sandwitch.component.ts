import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-sandwitch',
  templateUrl: './sandwitch.component.html',
  styleUrls: ['./sandwitch.component.scss']
})
export class SandwitchComponent implements OnInit {

  constructor(private homeService: HomeService, private wishService: WishlistService, private cartService:CartService) { }
  data:any;
  sandwitches:any[] =[];
  async ngOnInit() {
    this.sandwitches = await this.homeService.getAllSandwitchs();
  }
  
  addToWishList(id:string) {
    const index = this.sandwitches.findIndex((ele:any) => ele.id == id);
    
    this.wishService.addFoodToWishList(this.sandwitches[index])
 }

 addToCartList(id:string) {
  const index = this.sandwitches.findIndex((ele:any) => ele.id == id);
  this.cartService.addFoodToCartList(this.sandwitches[index]);
 }
}
