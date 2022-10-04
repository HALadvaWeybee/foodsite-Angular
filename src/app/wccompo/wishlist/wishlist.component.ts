import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(private wishService: WishlistService) { }
  
  foodList:any[] =[];
  ngOnInit(): void {
     this.foodList = this.wishService.wishList;
  }

  deleteFromWish(id:string) {
    this.foodList = this.foodList.filter((ele:any) => ele.id!=id);
  }

}
