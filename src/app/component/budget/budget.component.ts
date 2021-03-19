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
  categorySelectedRowIndex = 0;
  singleCategory;

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
          this.showBudgetDetail(this.budgets[0], 0);
        },
        (error) => {
          this.showSpinner = false;
        }
      );
  }
  showBudgetDetail(selectedData, index) {
    this.selectedRowIndex = index;
    if (selectedData.id) {
      this.showSpinner = true;
      sessionStorage.setItem('selectedBudgetId', selectedData.id);
      this.appService.selectedBudgetId = selectedData.id;
      let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}`;
      this.appService.get(url).subscribe(
        (resp) => {
          this.showSpinner = false;
          this.selectedBudget = resp;
          this.selectedBudgetCategory = this.selectedBudget.data.budget.categories;
          this.showCategoryDetail(this.selectedBudgetCategory[0], 0);
        },
        (err) => {
          this.showSpinner = false;
        }
      );
    }
  }
  showCategoryDetail(selectedData, index) {
    this.showSpinner = true;
    this.categorySelectedRowIndex = index;
    let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}/categories/${selectedData.id}`;
    this.appService.get(url).subscribe(
      (resp: any) => {
        this.showSpinner = false;
        this.singleCategory = resp?.data?.category || {};
      },
      (err) => {
        this.showSpinner = false;
      }
    );
  }
}
