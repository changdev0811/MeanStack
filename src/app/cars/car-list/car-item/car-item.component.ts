import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Car} from '../../car.model';
import { CarsService } from '../../cars.service';


@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit {
  @Input() car: Car;
  @Input() indexOfCar: number;

  constructor() { }

  ngOnInit() {
    // console.log(this.car)
  }

}
