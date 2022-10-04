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
  getBestForYou(){
    return this.http.get('./assets/menus/best-foods.json');
  }

  async getAllBurgers() {
    if(this.burgers.length == 0) {
      await this.http.get('./assets/menus/burgers.json').toPromise().then((res) => {
         this.data = res;
         this.burgers = this.data;
         return this.burgers;
      })
    }
    return this.burgers;
  }

  async getAllBreads() {
    if(this.breads.length == 0) {
      await this.http.get('./assets/menus/breads.json').toPromise().then((res) => {
         this.data = res;
         this.breads = this.data;
         return this.breads;
      })
    }
    return this.breads;
  }

  async getAllSandwitchs() {
    if(this.sandwitchs.length == 0) {
      await this.http.get('./assets/menus/sandwiches.json').toPromise().then((res) => {
         this.data = res;
         this.sandwitchs = this.data;
         return this.sandwitchs;
      })
    }
    return this.sandwitchs;
  }

  async getAllPizzas() {
    if(this.pizzas.length == 0) {
      await this.http.get('./assets/menus/pizzas.json').toPromise().then((res) => {
         this.data = res;
         this.pizzas = this.data;
         return this.pizzas;
      })
    }
    return this.pizzas;
  }

  async getAllDrinks() {
    if(this.drinks.length == 0) {
      await this.http.get('./assets/menus/drinks.json').toPromise().then((res) => {
         this.data = res;
         this.drinks = this.data;
         return this.drinks;
      })
    }
    return this.drinks;
  }
 

  // getAllBreads() {
  //   return this.http.get('/assets/menus/breads.json');
  // }

  // getAllSandwitchs() {
  //   return this.http.get('/assets/menus/sandwiches.json');
  // }

  // getAllPizzas() {
  //   return this.http.get('/assets/menus/pizzas.json');
  // }

  // getAllDrinks() {
  //   return this.http.get('/assets/menus/drinks.json');
  // }

  getAllBestFoods() {
    return this.http.get('/assets/menus/best-foods.json');
  }
}
