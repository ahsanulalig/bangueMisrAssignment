import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'first_month',
    'last_month',
    'last_modified_on',
  ];
  displayColumnsSelectedBudgetCategory = [
    'name',
    'budgeted',
    'activity',
    'balance',
  ];
  budgetsData;
  budgets;
  singleBudget;
  selectedRowIndex;
  showSpinner = true;
  selectedBudget;
  selectedBudgetCategory;
  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.appService
      .get('https://api.youneedabudget.com/v1/budgets?include_accounts=true')
      .subscribe(
        (resp) => {
          this.showSpinner = false;
          this.budgetsData = resp;
          this.budgets = this.budgetsData.data.budgets;
          this.singleBudget = this.budgets[0];
          this.appService.selectedBudgetId = this.singleBudget.id;
          sessionStorage.setItem('selectedBudgetId', this.singleBudget.id);
        },
        (error) => {
          this.showSpinner = false;
        }
      );
  }
  showBudgetDetail(selectedData, index) {
    this.selectedRowIndex = index;
    if (selectedData.id) {
      // this.showSpinner = true;
      sessionStorage.setItem('selectedBudgetId', selectedData.id);
      this.appService.selectedBudgetId = selectedData.id;
      let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}`;
      this.appService.get(url).subscribe(
        (resp) => {
          console.log('Response Selected budget ', resp);
          // this.singleBudget = resp;
          this.showSpinner = false;
          this.selectedBudget = resp;
          this.selectedBudgetCategory = this.selectedBudget.data.budget.categories;
        },
        (err) => {
          console.log('Error ', err);
          this.showSpinner = false;
        }
      );
    }
  }
}
