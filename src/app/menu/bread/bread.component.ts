import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss'],
})
export class BreadComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private wishService: WishlistService,
    private cartService: CartService
  ) {}
  data: any;
  breads: any[] = [];
  food: any;
  page: number = 1;
  total: number = 0;

  async ngOnInit() {
    this.breads = await this.homeService.getAllBreads();
    this.total = this.breads.length;
  }

  addToWishList(id: string) {
    const index = this.breads.findIndex((ele: any) => ele.id == id);
    this.wishService.addFoodToWishList(this.breads[index]);
  }

  addToCartList(id: string) {
    const index = this.breads.findIndex((ele: any) => ele.id == id);
    this.cartService.addFoodToCartList(this.breads[index]);
  }

  pageChangeEvent(event: number) {
    this.page = event;
  }
}
