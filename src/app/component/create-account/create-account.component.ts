import { Component, OnInit } from "@angular/core";
import { AppService } from "../../service/app.service";
import { AddAccountModalComponent } from "../../modals/add-account-modal/add-account-modal.component";
import { MatDialog } from "@angular/material/dialog";
export interface Account {
  name: string;
  type: string;
  balance: Number;
  uncleared_bal: Number;
  cleared_bal: Number;
}
@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.scss"],
})
export class CreateAccountComponent implements OnInit {
  displayedColumns: string[] = ["name", "type", "balance"];
  accountData;
  accounts;
  defaultAccount;
  selectedRowIndex = 0;
  showLoader = true;
  constructor(private appService: AppService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const selectedBudgetId = sessionStorage.getItem("selectedBudgetId");
    if (selectedBudgetId) {
      this.appService.selectedBudgetId = selectedBudgetId;
    }
    this.getAccountList();
  }
  showAccountDetail(selectedData, index) {
    this.selectedRowIndex = index;
    if (selectedData.id) {
      this.showLoader = true;
      let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}/accounts/${selectedData.id}`;
      this.appService.get(url).subscribe(
        (resp: any) => {
          this.defaultAccount = resp?.data?.account || {};
          this.showLoader = false;
        },
        (err) => {
          this.showLoader = false;
        }
      );
    } else {
      this.defaultAccount = selectedData;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddAccountModalComponent, {
      width: "22%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showLoader = true;
        const data = { account: result.accountData };
        let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}/accounts`;
        this.appService.post(url, data).subscribe(
          (resp) => {
            this.showLoader = false;
            this.getAccountList();
          },
          (err) => {
            this.showLoader = false;
          }
        );
      }
    });
  }

  getAccountList() {
    this.showLoader = true;
    let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}/accounts`;
    this.appService.get(url).subscribe(
      (resp) => {
        this.showLoader = false;
        this.accountData = resp;
        if (resp["data"].accounts.length) {
          this.accounts = this.accountData.data.accounts.filter(
            (account) => !account.deleted
          );
        }
        this.accounts.sort((a, b) => b["balance"] - a["balance"]);
        this.defaultAccount = this.accounts[0];
      },
      (err) => {
        this.showLoader = false;
      }
    );
  }
}
