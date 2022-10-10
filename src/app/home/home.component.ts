import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { JsLoader } from '../shared/js-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }
  data:any;
  recommendedForYou:any[] =[];
  resentFood:any[] =[];
  count:number = 0;

  ngOnInit(): void {
    this.resentFood = this.homeService.resentFood;
    JsLoader.sliderJs();
    this.homeService.getBestForYou().subscribe((res) => {
      this.data = res;
      for(let i = 1; i <= 10; i++) {
        this.recommendedForYou.push(this.data[i]);
       }
    })
  }

}
