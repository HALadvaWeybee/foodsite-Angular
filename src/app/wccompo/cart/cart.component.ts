import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService:CartService) { }

  foodList:any[] =[];
  ngOnInit(): void {
     this.foodList = this.cartService.cartList;
  }

  deleteFromCart(id:string) {
    this.foodList = this.foodList.filter((ele:any) => ele.id!=id);
  }

}
