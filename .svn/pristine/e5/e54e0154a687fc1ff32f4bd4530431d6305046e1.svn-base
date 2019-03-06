import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ReportPage from '../../core/report-page';
import { Inject, forwardRef } from '@angular/core';
import { ReportComponent } from '../report/report.component';
import { Store } from '../../store/store';

@Component({
  selector: 'app-compeleted',
  templateUrl: './compeleted.component.html',
  styleUrls: ['./compeleted.component.scss']
})
export class CompeletedComponent extends ReportPage implements OnInit {

  constructor( 
    store: Store,
    route: ActivatedRoute, 
    @Inject(forwardRef(() => ReportComponent)) parent: ReportComponent 
  ) {
    super(store.appStore(), route, parent);
  }

  ngOnInit() {
  }

}
