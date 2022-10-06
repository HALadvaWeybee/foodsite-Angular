import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { WishlistComponent } from '../wccompo/wishlist/wishlist.component';
import { CartComponent } from '../wccompo/cart/cart.component';

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
    path:'menu',
    loadChildren: () => import('./../menu/menu.module').then(m => m.MenuModule)
  },
  {
    path:'menu/:slug',
    loadChildren: () => import('./../detail/detail.module').then(m => m.DetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
