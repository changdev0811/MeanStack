import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Car } from './car.model';

@Injectable({ providedIn: "root" })
export class CarsService {
  private cars: Car[] = [];
  private postsUpdated = new Subject<{ cars: Car[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getCars(carsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${carsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; cars: any; maxCars: number; }>(
        "http://localhost:3000/api/cars" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            cars: postData.cars.map(car => {
              return {
                title: car.title,
                content: car.content,
                id: car._id,
                imagePath: car.imagePath,
                creator: car.creator
              };
            }),
            maxCars: postData.maxCars
          };
        })
      )
      .subscribe(transformedCarData => {
        this.cars = transformedCarData.cars;
        this.postsUpdated.next({
          cars: [...this.cars],
          postCount: transformedCarData.maxCars,
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getCar(id: number) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>("http://localhost:3000/api/cars/" + id);
  }

  addPost(title: string, content: string, image: File) {
    const carData = new FormData();
    carData.append("title", title);
    carData.append("content", content);
    carData.append("image", image, title);
    this.http
      .post<{ message: string; car: Car }>(
        "http://localhost:3000/api/cars",
        carData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let carData: Car | FormData;
    if (typeof image === "object") {
      carData = new FormData();
      carData.append("id", id);
      carData.append("title", title);
      carData.append("content", content);
      carData.append("image", image, title);
    } else {
      carData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put("http://localhost:3000/api/cars/" + id, carData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(carId: string) {
    return this.http
      .delete("http://localhost:3000/api/cars/" + carId);
  }
}
