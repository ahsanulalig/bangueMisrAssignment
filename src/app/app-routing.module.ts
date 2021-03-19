import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddAccountComponent } from "./component/add-account/add-account.component";
import { OnBoardingComponent } from "./component/onBoarding/onBoarding.component";
import { PayeeComponent } from "./component/payee/payee.component";

const routes: Routes = [
  {
    path: "",
    component: OnBoardingComponent,
  },
  {
    path: "budget",
    component: OnBoardingComponent,
  },
  {
    path: "accounts",
    component: AddAccountComponent,
  },
  {
    path: "payees",
    component: PayeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
