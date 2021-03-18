import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
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
  defaultData = [
    {
      name: 'Electricity',
      type: 'Electrical',
      balance: 10,
      uncleared_balance: 0,
      cleared_balance: 0,
      deleted: false,
    },
    {
      name: 'Water',
      type: 'Natural Resource',
      balance: 20,
      uncleared_balance: 0,
      cleared_balance: 0,
      deleted: false,
    },
    {
      name: 'Laptop',
      type: 'Electronics',
      balance: 5,
      uncleared_balance: 0,
      cleared_balance: 0,
      deleted: false,
    },
    {
      name: 'Laptop',
      type: 'Electronics',
      balance: 5,
      uncleared_balance: 0,
      cleared_balance: 0,
      deleted: true,
    },
  ];
  showSpinner = true;
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}/accounts`;
    this.appService.get(url).subscribe(
      (resp) => {
        this.showSpinner = false;
        console.log('Response ', resp);
        this.accountData = resp;
        if (resp['data'].accounts.length) {
          this.accounts = this.accountData.data.accounts.filter(
            (account) => !account.deleted
          );
        } else {
          this.accounts = this.defaultData.filter(
            (account) => !account.deleted
          );
        }
        this.accounts.sort((a, b) => b['balance'] - a['balance']);
        this.singleAccount = this.accounts[0];
      },
      (err) => {
        console.log('Error ', err);
        this.showSpinner = false;
      }
    );
  }
  showAccountDetail(selectedData, index) {
    console.log('data ', selectedData, ' ', index);
    this.selectedRowIndex = index;
    if (selectedData.id) {
      this.showSpinner = true;
      let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}/accounts/${selectedData.id}`;
      this.appService.get(url).subscribe(
        (resp) => {
          console.log('Response ', resp);
          this.singleAccount = resp;
          this.showSpinner = false;
        },
        (err) => {
          console.log('Error ', err);
          this.showSpinner = false;
        }
      );
    } else {
      this.singleAccount = selectedData;
    }
  }
}
