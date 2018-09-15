import { Component, OnInit } from '@angular/core';
import { Car} from './car.model';
import { CarsService } from './cars.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  selectedCar: Car;
  userId: string;

  constructor(
    public carsService: CarsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();

  }

}
