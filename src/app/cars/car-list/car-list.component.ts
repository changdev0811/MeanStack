import {Component, OnInit,  Output, EventEmitter, OnDestroy, Input} from '@angular/core';
import {Car} from '../car.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {PageEvent} from '@angular/material';
import { CarsService } from '../cars.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy {
  // @Output()  indexOfCar: number;
  cars: Car[] = [];

  isLoading = false;
  totalCars = 0;
  carsPerPage = 15;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private carsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public carsService: CarsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.carsService.getCars(this.carsPerPage, this.currentPage);
    this.carsSub = this.carsService
    .getPostUpdateListener()
    .subscribe((carData: { cars: Car[]; postCount: number }) => {
      // console.log(carData)
      this.isLoading = false;
      this.totalCars = carData.postCount;
      this.cars = carData.cars;
    });
    
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.carsPerPage = pageData.pageSize;
    this.carsService.getCars(this.carsPerPage, this.currentPage);
  }

  onDelete(carId: string) {
    this.isLoading = true;
    this.carsService.deletePost(carId).subscribe(() => {
      this.carsService.getCars(this.carsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.carsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }


}
