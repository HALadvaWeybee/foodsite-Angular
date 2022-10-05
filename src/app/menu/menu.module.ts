import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { BurgerComponent } from './burger/burger.component';
import { PizzaComponent } from './pizza/pizza.component';
import { SandwitchComponent } from './sandwitch/sandwitch.component';
import { BreadComponent } from './bread/bread.component';
import { DrinkComponent } from './drink/drink.component';
import { BestfoodComponent } from './bestfood/bestfood.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    BurgerComponent,
    PizzaComponent,
    SandwitchComponent,
    BreadComponent,
    DrinkComponent,
    BestfoodComponent,
  ],
  imports: [CommonModule, MenuRoutingModule, NgxPaginationModule],
  exports: [BurgerComponent],
})
export class MenuModule {}
