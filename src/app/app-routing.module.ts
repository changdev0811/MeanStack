import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";
import { CarCreateComponent } from './cars/car-create/car-create.component';
import { LanfingpageComponent } from "./lanfingpage/lanfingpage.component";

const routes: Routes = [
  { path: "", component: LanfingpageComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "create", component: CarCreateComponent },
  { path: "mycars", loadChildren: './cars/cars.module#CarsModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
