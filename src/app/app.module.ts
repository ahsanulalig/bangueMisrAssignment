import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BudgetComponent } from "./component/budget/budget.component";
import { TokenInterceptorService } from "./service/token-interceptor.service";
import { AddAccountComponent } from "./component/add-account/add-account.component";
import { PayeeComponent } from "./component/payee/payee.component";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CreateAccountModalComponent } from "./modals/create-account-modal/create-account-modal.component";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    AddAccountComponent,
    PayeeComponent,
    CreateAccountModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
