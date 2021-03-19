import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateAccountComponent } from "./component/create-account/create-account.component";
import { OnBoardingComponent } from "./component/onBoarding/onBoarding.component";
import { PayeeComponent } from "./component/payee/payee.component";

const routes: Routes = [
  {
    path: "",
    component: OnBoardingComponent,
  },
  {
    path: "onboarding",
    component: OnBoardingComponent,
  },
  {
    path: "accounts",
    component: CreateAccountComponent,
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
