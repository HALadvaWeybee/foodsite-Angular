import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { FoodinfoComponent } from './foodinfo/foodinfo.component';

@NgModule({
  declarations: [
    FoodinfoComponent,
  ],
  imports: [
    CommonModule,
    DetailRoutingModule
  ],
  exports: [
    FoodinfoComponent
  ]
})
export class DetailModule { }
