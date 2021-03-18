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
    'last_month',
    'first_month',
    'last_modified_on',
  ];
  budgetsData;
  budgets;
  singleBudget;
  selectedRowIndex;
  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.appService
      .get('https://api.youneedabudget.com/v1/budgets?include_accounts=true')
      .subscribe(
        (resp) => {
          this.budgetsData = resp;
          this.budgets = this.budgetsData.data.budgets;
          this.singleBudget = this.budgets[0];
          this.appService.selectedBudgetId = this.singleBudget.id;
        },
        (error) => {}
      );
  }
  showBudgetDetail(selectedData, index) {
    this.selectedRowIndex = index;
    if (selectedData.id) {
      this.appService.selectedBudgetId = selectedData.id;
      let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}`;
      this.appService.get(url).subscribe(
        (resp) => {
          console.log('Response Selected budget ', resp);
          this.singleBudget = resp;
        },
        (err) => {
          console.log('Error ', err);
        }
      );
    }
  }
}
