import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { CarsService } from "../cars.service";
import { Car } from "../car.model";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-car-create",
  templateUrl: "./car-create.component.html",
  styleUrls: ["./car-create.component.css"]
})
export class CarCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  car: Car;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private carId: string;

  constructor(
    public carsService: CarsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("carId")) {
        this.mode = "edit";
        this.carId = paramMap.get("carId");
        this.isLoading = true;
        //skw
        this.carsService.getCar(this.carId).subscribe(carData => {
          this.isLoading = false;
          this.car = {
            id: carData._id,
            title: carData.title,
            content: carData.content,
            imagePath: carData.imagePath,
            creator: carData.creator,
          };
          this.form.setValue({
            title: this.car.title,
            content: this.car.content,
            image: this.car.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.carId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.carsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.carsService.updatePost(
        this.carId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }


}
