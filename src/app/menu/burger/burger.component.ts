import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent implements OnInit {

  constructor(private homeService: HomeService, private wishService:WishlistService, private cartService:CartService) { }
  data:any;
  burgers:any[] =[];
  food:any;
  page:number = 1;
  total:number = 0;

  async ngOnInit() {
    this.burgers = await this.homeService.getAllBurgers();
    this.total = this.burgers.length;
    //  this.homeService.getAllBurgers().subscribe((res) => {
    //     this.data = res;
    //     this.burgers = this.data;
    //     console.log(this.burgers);
    //  })
  }

  addToWishList(id:string) {
    const index = this.burgers.findIndex((ele:any) => ele.id == id);
    this.wishService.addFoodToWishList(this.burgers[index])
  }
  
  addToCartList(id:string) {
     const index = this.burgers.findIndex((ele:any) => ele.id == id);
     this.cartService.addFoodToCartList(this.burgers[index])
  }
  
  pageChangeEvent(event:number) {
    this.page = event;
  } 
}
