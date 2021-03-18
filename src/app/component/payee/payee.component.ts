import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.scss'],
})
export class PayeeComponent implements OnInit {
  listOfPayees;
  displayedColumns: string[] = ['name'];
  payees;
  showSpinner = true;
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    let url = `https://api.youneedabudget.com/v1/budgets/${this.appService.selectedBudgetId}/payees`;
    this.appService.get(url).subscribe(
      (resp) => {
        console.log('List of Payees', resp);
        this.listOfPayees = resp;
        this.payees = this.listOfPayees.data.payees;
        this.showSpinner = false;
      },
      (err) => {
        console.log('Error getting payee', err);
        this.showSpinner = false;
      }
    );
  }
}
