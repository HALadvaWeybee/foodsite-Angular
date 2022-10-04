import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestfoodComponent } from './bestfood/bestfood.component';
import { BreadComponent } from './bread/bread.component';
import { BurgerComponent } from './burger/burger.component';
import { DrinkComponent } from './drink/drink.component';
import { PizzaComponent } from './pizza/pizza.component';
import { SandwitchComponent } from './sandwitch/sandwitch.component';

const routes: Routes = [
  {
    path:'pizza',
    component:PizzaComponent
  },
  {
    path:'bread',
    component:BreadComponent
  },
  {
    path:'burger',
    component:BurgerComponent
  },
  {
    path:'drink',
    component:DrinkComponent
  },
  {
    path:'sandwitch',
    component:SandwitchComponent
  },
  {
    path:'bestfood',
    component:BestfoodComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
