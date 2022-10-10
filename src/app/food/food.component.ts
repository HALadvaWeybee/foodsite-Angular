import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent implements OnInit {
  data: any;
  listOfFood: any[] = [];
  shownFood: any[] = [];
  food: any;
  page: number = 1;
  total: number = 0;
  alertShow:boolean = false;

  constructor(
    private homeService: HomeService,
    private wishService: WishlistService,
    private cartService: CartService,
    private _route: ActivatedRoute
  ) {
    this._route.paramMap.subscribe(() => {
       this.loadData();
    })
  }
  
  ngOnInit():void {}

  async loadData() {
     console.log('this param', this._route.snapshot.paramMap.get('slug'));

     switch (this._route.snapshot.paramMap.get('slug')) {
       case 'burger':
         this.listOfFood = await this.homeService.getAllBurgers();
         break;
       case 'bread':
         this.listOfFood = await this.homeService.getAllBreads();
         break;
       case 'drink':
         this.listOfFood = await this.homeService.getAllDrinks();
         break;
       case 'sandwitch':
         this.listOfFood = await this.homeService.getAllSandwitchs();
         break;
       case 'pizza':
         this.listOfFood = await this.homeService.getAllPizzas();
         break;
       case 'bestfood':
         this.listOfFood = await this.homeService.getAllbestFood();
         break;
     }
     this.shownFood = this.listOfFood;
     this.total = this.listOfFood.length;
  }

  searchInput(box: any, select: any) {
    if (select.value == '<100') {
      this.shownFood = this.listOfFood.filter(
        (ele: any) =>
          ele.price < 100 &&
          ele.name.toLowerCase().includes(box.value.toLowerCase())
      );
    } else if (select.value == '>100') {
      this.shownFood = this.listOfFood.filter(
        (ele: any) =>
          (ele.price > 100) &&
          ele.name.toLowerCase().includes(box.value.toLowerCase())
      );
    } else if (select.value == '>200') {
      this.shownFood = this.listOfFood.filter(
        (ele: any) =>
          ele.price > 200 &&
          ele.name.toLowerCase().includes(box.value.toLowerCase())
      );
    } else if (select.value == '<200') {
      this.shownFood = this.listOfFood.filter(
        (ele: any) =>
          ele.price < 200 &&
          ele.name.toLowerCase().includes(box.value.toLowerCase())
      );
    } else {
      this.shownFood = this.listOfFood.filter((ele: any) =>
        ele.name.toLowerCase().includes(box.value.toLowerCase())
      );
    }
    this.total = this.shownFood.length;
    this.page = 1;
  }

  addToWishList(id: string) {
    const index = this.listOfFood.findIndex((ele: any) => ele.id == id);
    this.wishService.addFoodToWishList(this.listOfFood[index]);
  }

  addToCartList(id: string) {
    const index = this.listOfFood.findIndex((ele: any) => ele.id == id);
    this.cartService.addFoodToCartList(this.listOfFood[index]);
  }

  pageChangeEvent(event: number) {
    this.page = event;
  }
}
