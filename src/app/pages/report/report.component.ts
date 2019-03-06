import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  tabTitles: any[];

  constructor() {
    this.tabTitles = [
      {
        title: 'op watch lists',
        href: '#/report/watch-list',
        active: false,
      },
      {
        title: 'up coming',
        href: '#/report/upcoming',
        active: false,
      },
      {
        title: 'compelete',
        href: '#/report/compeleted',
        active: false,
      }
    ];
  }
}
