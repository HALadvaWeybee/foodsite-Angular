import { CartComponent } from './wccompo/cart/cart.component';
import { WishlistComponent } from './wccompo/wishlist/wishlist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodComponent } from './food/food.component';
import { FoodinfoComponent } from './foodinfo/foodinfo.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  {
    path:'wishlist',
    component:WishlistComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'menu/:slug',
    component:FoodComponent,  
  },
  {
    path:'menu/:slug/:dsc',
    component:FoodinfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
