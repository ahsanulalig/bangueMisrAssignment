import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAccountComponent } from './component/add-account/add-account.component';
import { BudgetComponent } from './component/budget/budget.component';
import { PayeeComponent } from './component/payee/payee.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetComponent,
  },
  {
    path: 'budget',
    component: BudgetComponent,
  },
  {
    path: 'create-account',
    component: AddAccountComponent,
  },
  {
    path: 'payee',
    component: PayeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
