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
     this.foodList = [...this.cartService.cartList];
     console.log("this food", this.foodList);
     
     this.foodList.forEach(ele => {
        this.total_amount += (ele?.data?.price * ele.quantity);
     })
  }

  deleteFromCart(id:string) {
    this.total_amount -= (this.foodList.filter((ele:any) => ele?.data?.id==id)[0].data?.price * this.foodList.filter((ele:any) => ele?.data?.id==id)[0].quantity)
    this.foodList = this.foodList.filter((ele:any) => ele?.data?.id!=id);
    this.cartService.deleteFromCartList(id);
    localStorage.setItem('cartList', JSON.stringify([...this.foodList]));
  }
   
  addIntoCart(obj:any) {
    this.foodList.filter(ele => ele?.data?.id == obj.id)[0].quantity++;
    this.total_amount += (this.foodList.filter(ele => ele?.data?.id == obj.id)[0]?.data?.price)
    localStorage.setItem('cartList', JSON.stringify([...this.foodList]));
  }
  removeFromCart(obj:any) {
    if(this.foodList.filter(ele => ele?.data?.id == obj.id)[0].quantity > 1) {
      this.foodList.filter(ele => ele?.data?.id == obj.id)[0].quantity--;
      this.total_amount -= (this.foodList.filter(ele => ele?.data?.id == obj.id)[0]?.data?.price);
    }
    localStorage.setItem('cartList', JSON.stringify([...this.foodList]));
  }
}
