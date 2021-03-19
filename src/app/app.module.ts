import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OnBoardingComponent } from './component/onBoarding/onBoarding.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { CreateAccountComponent } from './component/create-account/create-account.component';
import { PayeeComponent } from './component/payee/payee.component';
import { FormsModule } from '@angular/forms';
import { AddAccountModalComponent } from './modals/add-account-modal/add-account-modal.component';
import { MatModuleModule } from './module/mat-module/mat-module.module';

@NgModule({
  declarations: [
    AppComponent,
    OnBoardingComponent,
    CreateAccountComponent,
    PayeeComponent,
    AddAccountModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatModuleModule,
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
