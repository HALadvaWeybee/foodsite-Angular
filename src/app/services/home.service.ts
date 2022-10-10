import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  
  data:any;
  burgers:any[] = [];
  breads:any[] =[];
  pizzas:any[] =[];
  sandwitchs:any[] =[];
  drinks:any[]=[];
  bestFood:any[] =[];
  resentFood:any[] =[];

  getBestForYou(){
    return this.http.get('https://ig-food-menus.herokuapp.com/best-foods');
  }
 
  async getAllbestFood() {
    if(this.bestFood.length == 0) {
      await this.http.get('./assets/menus/best-foods.json').toPromise().then((res) => {
         this.data = res;
         this.bestFood = this.data;
         return this.bestFood;
      })
    }
    return this.bestFood;
  }
  
  async getAllBurgers() {
    if(this.burgers.length == 0) {
      await this.http.get('https://ig-food-menus.herokuapp.com/burgers').toPromise().then((res) => {
         this.data = res;
         this.burgers = this.data;
         return this.burgers;
      })
    }
    return this.burgers;
  }

  async getAllBreads() {
    if(this.breads.length == 0) {
      await this.http.get('https://ig-food-menus.herokuapp.com/breads').toPromise().then((res) => {
         this.data = res;
         this.breads = this.data;
         return this.breads;
      })
    }
    return this.breads;
  }

  async getAllSandwitchs() {
    if(this.sandwitchs.length == 0) {
      await this.http.get('https://ig-food-menus.herokuapp.com/sandwiches').toPromise().then((res) => {
         this.data = res;
         this.sandwitchs = this.data;
         return this.sandwitchs;
      })
    }
    return this.sandwitchs;
  }

  async getAllPizzas() {
    if(this.pizzas.length == 0) {
      await this.http.get('https://ig-food-menus.herokuapp.com/pizzas').toPromise().then((res) => {
         this.data = res;
         this.pizzas = this.data;
         return this.pizzas;
      })
    }
    return this.pizzas;
  }

  async getAllDrinks() {
    if(this.drinks.length == 0) {
      await this.http.get('https://ig-food-menus.herokuapp.com/drinks').toPromise().then((res) => {
         this.data = res;
         this.drinks = this.data;
         return this.drinks;
      })
    }
    return this.drinks;
  }
  
}
