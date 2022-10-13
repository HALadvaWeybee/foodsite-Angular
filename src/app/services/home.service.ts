import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { 
     console.log("i am in home service");
     const data = localStorage.getItem('resentFood');
     if(data) {
      this.resentFood = JSON.parse(data);
     }
  }
  
  data:any;
  burgers:any[] = [];
  breads:any[] =[];
  pizzas:any[] =[];
  sandwitchs:any[] =[];
  drinks:any[]=[];
  bestFood:any[] =[];
  resentFood:any[] =[];
  ourFoods:any[] =[];
  pagination:any;

  async getBestForYou(){
    await this.http.get('https://ig-food-menus.herokuapp.com/best-foods?_limit=10').toPromise().then((res) => {
       this.data = res;
    });
    return this.data
  }
  
  async getSpecifyFood(category:string,id:string) {
     await this.http.get('https://ig-food-menus.herokuapp.com/'+category+'?id=' +id).toPromise().then((res) =>{
        this.data = res;
     })
     return this.data;
  }

  async getAllbestFood(page:number) {
    await this.http.get('https://ig-food-menus.herokuapp.com/best-foods?_limit=8&_page=' + page).toPromise().then((res) => {
         this.data = res;
         this.bestFood = this.data;
      })
    return this.bestFood;
  }
  
  async getAllBurgers(page:number) {
       await this.http.get('https://ig-food-menus.herokuapp.com/burgers?_limit=8&_page=' + page).toPromise().then((res) => {
           this.data = res;
           this.burgers = this.data;
       })
     return this.burgers;
  }

  async getAllBreads(page:number) {
      await this.http.get('https://ig-food-menus.herokuapp.com/breads?_limit=8&_page=' + page).toPromise().then((res) => {
         this.data = res;
         this.breads = this.data;
      })
    return this.breads;
  }

  async getAllSandwitchs(page:number) {
      await this.http.get('https://ig-food-menus.herokuapp.com/sandwiches?_limit=8&_page=' + page).toPromise().then((res) => {
         this.data = res;
         this.sandwitchs = this.data;
      })
    return this.sandwitchs;
  }

  async getAllPizzas(page:number) {
      await this.http.get('https://ig-food-menus.herokuapp.com/pizzas?_limit=8&_page=' + page).toPromise().then((res) => {
         this.data = res;
         this.pizzas = this.data;
      })
    return this.pizzas;
  }

  async getAllDrinks(page:number) {
      await this.http.get('https://ig-food-menus.herokuapp.com/drinks?_limit=8&_page=' + page).toPromise().then((res) => {
         this.data = res;
         this.drinks = this.data;
      })
    return this.drinks;
  }
   
  async getAllOurFood(search:string) {
    await this.http.get('https://ig-food-menus.herokuapp.com/our-foods?name_like='+ search).toPromise().then((res) => {
      this.data = res;
      this.ourFoods = this.data
      console.log("ourfoods",this.ourFoods.length);
   })
   return this.ourFoods;
  }

  async getPagination(type:any) {
     await this.http.get('https://ig-food-menus.herokuapp.com/pagination').toPromise().then((res) => {
        this.data = res;
     })
     return this.data[type];
  }
}
