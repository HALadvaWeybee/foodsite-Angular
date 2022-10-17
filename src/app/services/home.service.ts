import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

   data:any;
   resentFood:any[] =[];

  constructor(private http: HttpClient) { 
     console.log("i am in home service");
     const data = localStorage.getItem('resentFood');
     if(data) {
      this.resentFood = JSON.parse(data);
     }
  }
  

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

  async getAllFoodWishCategory(category:string, page:number, productPerPage:number) {
       await this.http.get('https://ig-food-menus.herokuapp.com/'+category+'?_limit='+productPerPage+'&_page=' + page).toPromise().then((res) => {
           this.data = res;
       })
     return this.data;
  }

  async getAllSearchFood(category:string, search:string) {
    await this.http.get('https://ig-food-menus.herokuapp.com/'+category+'?name_like='+ search).toPromise().then((res) => {
      this.data = res;
   })
   return this.data;
  }

  async getPagination(type:any) {
     await this.http.get('https://ig-food-menus.herokuapp.com/pagination').toPromise().then((res) => {
        this.data = res;
     })
     return this.data[type];
  }
}
