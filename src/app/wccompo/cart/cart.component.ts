import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'] 
})
export class CartComponent implements OnInit {
  total_amount:number=0;
  productCount:number=1;
  constructor(private cartService:CartService) { }

  foodList:any[] =[];
  ngOnInit(): void {
     this.foodList = this.cartService.cartList;
     this.foodList.forEach(ele => {
       this.total_amount+=ele.price;
     })
  }

  deleteFromCart(id:string) {
    this.foodList = this.foodList.filter((ele:any) => ele.id!=id);
    this.cartService.deleteFromCartList(id);
  }
   
  addIntoCart(price:number) {
    this.productCount++;
    this.total_amount += (price);
  }
  removeFromCart(price:number) {
    if(this.productCount>1) {
      this.productCount--;
      this.total_amount -= (price);
    }
  }
}
