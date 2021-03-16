import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService
      .get('https://api.youneedabudget.com/v1/budgets?include_accounts=true')
      .subscribe(
        (resp) => {
          console.log(' Data List ', resp);
        },
        (error) => {}
      );
  }
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
