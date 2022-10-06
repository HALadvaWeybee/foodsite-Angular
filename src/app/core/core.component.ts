import { WishlistService } from 'src/app/services/wishlist.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(private wishService: WishlistService) { }
  
  wishListCount:number =0;
  async ngOnInit() {
    this.wishListCount = await this.wishService.getWishListCount();
    console.log("this cout",this.wishListCount);
  }

}
