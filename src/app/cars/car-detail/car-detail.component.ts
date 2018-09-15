import { Input, Component, OnInit } from '@angular/core';
import { Car } from '../car.model';
import { CarsService } from '../cars.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  @Input() car: Car[] = [];
  @Input() carId: number;
  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log(this.car);
          // console.log(this.carId)
          console.log(params)
          this.carId = +params['id'];
          this.carsService.getCar(this.carId).subscribe(res => this.car = res);//skw
          
          // this.car = this.carsService.getCar(this.id);
          
          

        }
      );
  }

}
