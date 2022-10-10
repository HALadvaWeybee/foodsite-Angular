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
  dsc:any;
  slug:any;
  data:any[] =[];
  index:number = -1;
  cartMsg:boolean = false;
  wishMsg:boolean = false;
  printDetail:any;
  productCount:number=1;

  async ngOnInit() {
    this.dsc = this.route.snapshot.paramMap.get('dsc');
    this.slug = this.route.snapshot.paramMap.get('slug');
    console.log(this.dsc, this.slug);
    
    switch(this.slug) {
      case 'burger':
        this.data = await this.homeService.getAllBurgers();
        break;
      case 'bread':
        this.data = await this.homeService.getAllBreads();
        break;
      case 'sandwitch':
        this.data = await this.homeService.getAllSandwitchs();
        break;
      case 'pizza':
        this.data = await this.homeService.getAllPizzas();
        break;  
      case 'drink':
        this.data = await this.homeService.getAllDrinks();
        break;
      case 'bestfood':
        this.data = await this.homeService.getAllbestFood();
        break;
    }
    this.index = this.data.findIndex((ele: any) => ele.dsc == this.dsc);
    this.printDetail = this.data[this.index];
    if(this.homeService.resentFood.length < 5) this.homeService.resentFood.push(this.printDetail)
    console.log(this.printDetail);
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
