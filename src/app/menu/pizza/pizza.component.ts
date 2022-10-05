import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
})
export class PizzaComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private wishService: WishlistService,
    private cartService: CartService
  ) {}
  data: any;
  pizzas: any[] = [];
  food: any;
  page: number = 1;
  total: number = 0;

  async ngOnInit() {
    this.pizzas = await this.homeService.getAllPizzas();
    this.total = this.pizzas.length;
  }

  addToWishList(id: string) {
    const index = this.pizzas.findIndex((ele: any) => ele.id == id);
    this.wishService.addFoodToWishList(this.pizzas[index]);
  }

  addToCartList(id: string) {
    const index = this.pizzas.findIndex((ele: any) => ele.id == id);
    this.cartService.addFoodToCartList(this.pizzas[index]);
  }

  pageChangeEvent(event: number) {
    this.page = event;
  }
}
