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
  printDetail:any;
  productCount:number=1;

  async ngOnInit() {
    this.dsc = this.route.snapshot.paramMap.get('dsc');
    this.slug = this.route.snapshot.paramMap.get('slug');
    console.log(this.dsc, this.slug);
    
    switch(this.slug) {
      case 'burger':
        this.data = await this.homeService.getAllBurgers();
        this.index = this.data.findIndex((ele:any) => ele.dsc == this.dsc);
        this.printDetail = this.data[this.index];
        console.log(this.printDetail);
        break;

      case 'bread':
        this.data = await this.homeService.getAllBreads();
        this.index = this.data.findIndex((ele:any) => ele.dsc == this.dsc);
        this.printDetail = this.data[this.index];
        console.log(this.printDetail);
        break;

      case 'sandwitch':
        this.data = await this.homeService.getAllSandwitchs();
        this.index = this.data.findIndex((ele:any) => ele.dsc == this.dsc);
        this.printDetail = this.data[this.index];
        console.log(this.printDetail);
        break;

      case 'pizza':
        this.data = await this.homeService.getAllPizzas();
        this.index = this.data.findIndex((ele:any) => ele.dsc == this.dsc);
        this.printDetail = this.data[this.index];
        console.log(this.printDetail);
        break;
        
      case 'drink':
        this.data = await this.homeService.getAllDrinks();
        this.index = this.data.findIndex((ele:any) => ele.dsc == this.dsc);
        this.printDetail = this.data[this.index];
        console.log(this.printDetail);
        break;
    }
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
  }

  addToCartList() {
    this.cartService.addFoodToCartList(this.printDetail);
  }

}
