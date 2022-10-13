import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-foodinfo', 
  templateUrl: './foodinfo.component.html',
  styleUrls: ['./foodinfo.component.scss']
})
export class FoodinfoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private homeService:HomeService, private wishService: WishlistService, private cartService:CartService,
     private title:Title
    ) { }
  id:any;
  slug:any;
  data:any[] =[];
  index:number = -1;
  cartMsg:boolean = false;
  wishMsg:boolean = false;
  isProductInCart:boolean = false;
  message:string[] = ['Add to Cart', 'Remove From Cart'];
  printDetail:any;
  productCount:number=1;
  buttonDisabled:boolean = false;
  isLoading = true;

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.title.setTitle(this.slug+" | "+this.id)
    this.data = await this.homeService.getSpecifyFood(this.slug, this.id);
    this.printDetail = this.data[0];  
    this.isLoading = false; 
    if(this.wishService.wishList.findIndex((ele) => ele.id == this.printDetail.id)!=-1) {
    this.buttonDisabled = true;
    }
    if(this.homeService.resentFood.length < 5){
      if(this.homeService.resentFood.length==0) {
         this.homeService.resentFood.unshift(this.printDetail)
      }
      if(this.homeService.resentFood.findIndex(ele => ele.id==this.id)==-1 && this.homeService.resentFood.length != 0) {
        this.homeService.resentFood.unshift(this.printDetail)
      } 
      localStorage.setItem('resentFood', JSON.stringify([...this.homeService.resentFood]))
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
    this.wishMsg = true;
    this.buttonDisabled = true;
    setTimeout(() => {
      this.wishMsg = false;
    }, 1500);
  }

  addToCartList() {
    this.cartService.addFoodToCartList(this.printDetail, this.productCount);
    this.cartMsg = true;
    this.isProductInCart = !this.isProductInCart;
    
    setTimeout(() => {
      this.cartMsg = false;
    }, 1500);
  }

}
