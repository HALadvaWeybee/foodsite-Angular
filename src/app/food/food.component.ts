import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
  // alertShow:boolean = false;
  cartMsg:boolean = false;
  wishMsg:boolean = false;
  productPerPageArr = [8 , 12, 16, 20];
  productPerPage:number = Number(this._route.snapshot.queryParamMap.get('limit')) ?? 8;
  isLoading=true;

  constructor(
    private homeService: HomeService,
    private wishService: WishlistService,
    private cartService: CartService,
    private _route: ActivatedRoute,
    private _router: Router,
    private title:Title
  ) {
    this._route.paramMap.subscribe((par) => {
      this.loadData();
      console.log("router paramap called");
      this.title.setTitle(par.get('slug')); 
   })
   this._route.queryParams.subscribe((params: Params):void => {
     this.page = +params['page'] ? +params['page'] : 1;
     this.productPerPage = +params['limit'] ? +params['limit'] : 8;
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
        limit: Number(this._route.snapshot.queryParamMap.get('limit')) || 8,
        search:this._route.snapshot.queryParamMap.get('search')==''?null: this._route.snapshot.queryParamMap.get('search'),
      },
      queryParamsHandling:'merge'
    })
  }
  
  itemPerPage(event:any) {
    this.productPerPage = event.target.value;
    this.page = 1;
    this._router.navigate(['menu/our-foods'],
        {
          queryParams: {
            page: this.page,
            limit:this.productPerPage,
            search:this.search==''?null:this.search,
          }, 
          queryParamsHandling:'merge'
        } 
      )
    this.loadData();
  }
  async loadData() {
     this.slug = this._route.snapshot.paramMap.get('slug');
    //  console.log('this param', this._route.snapshot.paramMap.get('slug'));
    // console.log("page is", this._route.snapshot.queryParamMap.get('page'));  
      if(this.slug =='our-foods') {
         console.log("search", this.search);
         this.listOfFood = await this.homeService.getAllOurFood(this.search);
         this.isLoading =false;
         this.total = this.listOfFood.length; 
         console.log("ourfoods total", this.total);
       } else {
        this.listOfFood = await this.homeService.getAllFoodWishCategory(this.slug , this.page, this.productPerPage);
        this.isLoading =false;
        this.total = await this.homeService.getPagination(this._route.snapshot.paramMap.get('slug')); 
       }
       this.listOfFood.forEach(ele => {
          this.wishService.wishList.findIndex(e => e.id == ele.id)==-1 ? ele.isInWishList= false:ele.isInWishList= true;
          this.cartService.cartList.findIndex(e => e.id == ele.id)==-1 ? ele.isInCartList= false:ele.isInCartList= true;
       })
     this.shownFood = this.listOfFood;
     
  }

  searchInput(box: any) {
    if(!(+box.value)) {
      this.search = box.value;
      this.page = 1;
      this._router.navigate(['menu/our-foods'],
        {
          queryParams: {
            page: this.page,
            limit:this.productPerPage,
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
     this.listOfFood[index].isInWishList = !this.listOfFood[index].isInWishList;
     this.wishMsg = true;
     
     setTimeout(() => {
       this.wishMsg = false;
     }, 1500);
  }

  addToCartList(id: string) {
    const index = this.listOfFood.findIndex((ele: any) => ele.id == id);
    this.cartService.addFoodToCartList(this.listOfFood[index], 1);
    this.listOfFood[index].isInCartList = !this.listOfFood[index].isInCartList;
    this.cartMsg = true;
    setTimeout(() => {
      this.cartMsg = false;
    }, 1500);
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
          limit:this.productPerPage===0 ? null : this.productPerPage,
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