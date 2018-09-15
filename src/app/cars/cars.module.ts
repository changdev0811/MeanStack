import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CarsComponent } from './cars.component';
import { CarsRoutingModule } from './cars-routing.module';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarItemComponent } from './car-list/car-item/car-item.component';

@NgModule({
  declarations: [
    CarListComponent,
    CarsComponent,
    CarDetailComponent,
    CarItemComponent
  ],
  imports: [
    CarsRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CarsModule {}
