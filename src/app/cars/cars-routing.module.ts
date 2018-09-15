import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarsComponent } from './cars.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { AuthGuard } from '../auth/auth.guard';

const mycarsRoutes: Routes = [
  { path: 'mycars', component: CarsComponent, children: [
    { path: ':id', component: CarDetailComponent},
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(mycarsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class CarsRoutingModule {}
