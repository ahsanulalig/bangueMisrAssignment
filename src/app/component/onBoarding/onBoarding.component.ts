import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/service/app.service";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onBoarding.component.html",
  styleUrls: ["./onBoarding.component.scss"],
})
export class OnBoardingComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "first_month",
    "last_month",
    "last_modified_on",
  ];
  displayColumnsSelectedBudgetCategory = [
    "name",
    "budgeted",
    "activity",
    "balance",
  ];
  budgetsData;
  budgets;
  singleBudget;
  selectedRowIndex;
  showLoader = true;
  selectedBudget;
  selectedBudgetCategory;
  categorySelectedRowIndex = 0;
  singleCategory;

  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.appService
      .get("https://api.youneedabudget.com/v1/budgets?include_accounts=true")
      .subscribe(
        (resp) => {
          this.showLoader = false;
          this.budgetsData = resp;
          this.budgets = this.budgetsData.data.budgets;
          this.singleBudget = this.budgets[0];
          this.appService.selectedBudgetId = this.singleBudget.id;
          sessionStorage.setItem("selectedBudgetId", this.singleBudget.id);
          this.showBudgetDetail(this.budgets[0], 0);
        },
        (error) => {
          this.showLoader = false;
        }
      );
  }
  showBudgetDetail(selectedData, index) {
    this.selectedRowIndex = index;
    if (selectedData.id) {
      this.showLoader = true;
      sessionStorage.setItem("selectedBudgetId", selectedData.id);
      this.appService.selectedBudgetId = selectedData.id;
      let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}`;
      this.appService.get(url).subscribe(
        (resp) => {
          this.showLoader = false;
          this.selectedBudget = resp;
          this.selectedBudgetCategory = this.selectedBudget.data.budget.categories;
          this.showCategoryDetail(this.selectedBudgetCategory[0], 0);
        },
        (err) => {
          this.showLoader = false;
        }
      );
    }
  }
  showCategoryDetail(selectedData, index) {
    this.showLoader = true;
    this.categorySelectedRowIndex = index;
    let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}/categories/${selectedData.id}`;
    this.appService.get(url).subscribe(
      (resp: any) => {
        this.showLoader = false;
        this.singleCategory = resp?.data?.category || {};
      },
      (err) => {
        this.showLoader = false;
      }
    );
  }
}
