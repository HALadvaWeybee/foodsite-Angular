import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-bestfood',
  templateUrl: './bestfood.component.html',
  styleUrls: ['./bestfood.component.scss']
})
export class BestfoodComponent implements OnInit {

  constructor(private homeService: HomeService) { }
  data:any;
  bestfoods:any[] =[];
  ngOnInit(): void {
     this.homeService.getAllBestFoods().subscribe((res) => {
        this.data = res;
        this.bestfoods = this.data;
     })
  }


}
