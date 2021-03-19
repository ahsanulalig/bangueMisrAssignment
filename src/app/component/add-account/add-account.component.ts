import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';
import { CreateAccountModalComponent } from '../../modals/create-account-modal/create-account-modal.component';
import { MatDialog } from '@angular/material/dialog';
export interface Account {
  name: string;
  type: string;
  balance: Number;
  uncleared_balance: Number;
  cleared_balance: Number;
}
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'balance'];
  accountData;
  accounts;
  singleAccount;
  selectedRowIndex = 0;
  showSpinner = true;
  constructor(private appService: AppService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const selectedBudgetId = sessionStorage.getItem('selectedBudgetId');
    if (selectedBudgetId) {
      this.appService.selectedBudgetId = selectedBudgetId;
    }
    this.showSpinner = true;
    let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}/accounts`;
    this.appService.get(url).subscribe(
      (resp) => {
        this.showSpinner = false;
        this.accountData = resp;
        if (resp['data'].accounts.length) {
          this.accounts = this.accountData.data.accounts.filter(
            (account) => !account.deleted
          );
        }
        this.accounts.sort((a, b) => b['balance'] - a['balance']);
        this.singleAccount = this.accounts[0];
      },
      (err) => {
        this.showSpinner = false;
      }
    );
  }
  showAccountDetail(selectedData, index) {
    this.selectedRowIndex = index;
    if (selectedData.id) {
      this.showSpinner = true;
      let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}/accounts/${selectedData.id}`;
      this.appService.get(url).subscribe(
        (resp: any) => {
          this.singleAccount = resp?.data?.account || {};
          this.showSpinner = false;
        },
        (err) => {
          this.showSpinner = false;
        }
      );
    } else {
      this.singleAccount = selectedData;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateAccountModalComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showSpinner = true;
        const data = { account: result.accountDetails };
        let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}/accounts`;
        this.appService.post(url, data).subscribe(
          (resp) => {
            this.showSpinner = false;
            this.ngOnInit();
          },
          (err) => {
            this.showSpinner = false;
          }
        );
      }
    });
  }
}
