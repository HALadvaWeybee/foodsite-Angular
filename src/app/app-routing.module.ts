import { NgModule } from '@angular/core';
import { CoreComponent } from './core/core.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
      path:'',
      component:CoreComponent,
      loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
