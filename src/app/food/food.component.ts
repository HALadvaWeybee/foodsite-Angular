import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

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
  page: number = Number(this._route.snapshot.queryParamMap.get('page')) ?? 1;
  total: number = 0;
  search = this._route.snapshot.queryParamMap.get('search') || '';
  slug:any;
  alertShow:boolean = false;

  constructor(
    private homeService: HomeService,
    private wishService: WishlistService,
    private cartService: CartService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._route.paramMap.subscribe((par) => {
      this.loadData();
      console.log("router paramap called");
      
   })
   this._route.queryParams.subscribe((params: Params):void => {
     this.page = +params['page'] ? +params['page'] : 1;
     this.search = params['search'] ? params['search'] :'';
     console.log("search is", this.search);
     console.log("page is", this.page);
     this.loadData();
   })
  }
  
  ngOnInit():void {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        page: Number(this._route.snapshot.queryParamMap.get('page')) || 1,
        search:this._route.snapshot.queryParamMap.get('search')==''?null: this._route.snapshot.queryParamMap.get('search'),
      },
      queryParamsHandling:'merge'
    })
  }

  async loadData() {
     this.slug = this._route.snapshot.paramMap.get('slug');
    //  console.log('this param', this._route.snapshot.paramMap.get('slug'));
    // console.log("page is", this._route.snapshot.queryParamMap.get('page'));  
     switch (this._route.snapshot.paramMap.get('slug')) {
       case 'burgers':
         this.listOfFood = await this.homeService.getAllBurgers(this.page);
         this.total = await this.homeService.getPagination(this._route.snapshot.paramMap.get('slug')); 
         break;
       case 'breads':
         this.listOfFood = await this.homeService.getAllBreads(this.page);
         this.total = await this.homeService.getPagination(this._route.snapshot.paramMap.get('slug')); 
         break;
       case 'drinks':
         this.listOfFood = await this.homeService.getAllDrinks(this.page);
         this.total = await this.homeService.getPagination(this._route.snapshot.paramMap.get('slug')); 
         break;
       case 'sandwiches':
         this.listOfFood = await this.homeService.getAllSandwitchs(this.page);
         this.total = await this.homeService.getPagination(this._route.snapshot.paramMap.get('slug')); 
         break;
       case 'pizzas':
         this.listOfFood = await this.homeService.getAllPizzas(this.page);
         this.total = await this.homeService.getPagination(this._route.snapshot.paramMap.get('slug')); 
         break;
       case 'best-foods':
         this.listOfFood = await this.homeService.getAllbestFood(this.page);
         this.total = await this.homeService.getPagination(this._route.snapshot.paramMap.get('slug')); 
         break;
       case 'our-foods':
         console.log("search", this.search);
         this.listOfFood = await this.homeService.getAllOurFood(this.search);
         this.total = this.listOfFood.length; 
         console.log("ourfoods total", this.total);
         break;
     }
    //  this.total = await this.homeService.getPagination(this._route.snapshot.paramMap.get('slug'));  
     this.shownFood = this.listOfFood;
    // this.total = 60;
  }

  searchInput(box: any) {
    if(!(+box.value)) {
      this.search = box.value;
      this.page = 1;
      this._router.navigate(['menu/our-foods'],
        {
          queryParams: {
            page: this.page,
            search:this.search==''?null:this.search,
          },
          queryParamsHandling:'merge'
        } 
      )
    }
  }

  filterProduct(select:any) {
    console.log("i am called");
    if(select.value == 'price' || select.value == 'rprice')
     select.value == 'price'? this.listOfFood.sort((a, b) => a.price > b.price ? 1 : -1) : this.listOfFood.sort((a, b) => a.price > b.price ? -1 : 1);
    else
     select.value == 'rate'? this.listOfFood.sort((a, b) => a.rate > b.rate ? 1 : -1) : this.listOfFood.sort((a, b) => a.rate > b.rate ? -1 : 1); 
    // this.total = this.shownFood.length;
  }

  addToWishList(id: string) {
    const index = this.listOfFood.findIndex((ele: any) => ele.id == id);
     this.wishService.addFoodToWishList(this.listOfFood[index]);
  }

  addToCartList(id: string) {
    const index = this.listOfFood.findIndex((ele: any) => ele.id == id);
    this.cartService.addFoodToCartList(this.listOfFood[index], 1);
  }

  pageChangeEvent(event: number) {
    this.page = event;
    // if(this._route.snapshot.paramMap.get('slug')!='our-foods') {
      this.loadData();
      console.log("you are enter");
    // }

      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: {
          page: this.page===0 ? null :this.page,
          search:this.search==''?null:this.search,
        },
        queryParamsHandling:'merge'
      })
  
  }
}

// if (select.value == '<100') {
//   this.shownFood = this.listOfFood.filter(
//     (ele: any) =>
//       ele.price < 100 &&
//       ele.name.toLowerCase().includes(box.value.toLowerCase())
//   );
// } else if (select.value == '>100') {
//   this.shownFood = this.listOfFood.filter(
//     (ele: any) =>
//       (ele.price > 100) &&
//       ele.name.toLowerCase().includes(box.value.toLowerCase())
//   );
// } else if (select.value == '>200') {
//   this.shownFood = this.listOfFood.filter(
//     (ele: any) =>
//       ele.price > 200 &&
//       ele.name.toLowerCase().includes(box.value.toLowerCase())
//   );
// } else if (select.value == '<200') {
//   this.shownFood = this.listOfFood.filter(
//     (ele: any) =>
//       ele.price < 200 &&
//       ele.name.toLowerCase().includes(box.value.toLowerCase())
//   );
// } else {
//   this.shownFood = this.listOfFood.filter((ele: any) =>
//     ele.name.toLowerCase().includes(box.value.toLowerCase())
//   );
// }

//  if (select.value == '<100') {
//    this.shownFood = this.listOfFood.filter((ele: any) => ele.price < 100);
//  } else if (select.value == '>100') {
//    this.shownFood = this.listOfFood.filter((ele: any) => ele.price > 100);
//  } else if (select.value == '>200') {
//    this.shownFood = this.listOfFood.filter((ele: any) => ele.price > 200);
//  } else if (select.value == '<200') {
//    this.shownFood = this.listOfFood.filter((ele: any) => ele.price < 200);
//  } else {
//    this.shownFood = this.listOfFood.filter((ele: any) => ele.price < 100);
//  }