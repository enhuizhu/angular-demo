import { Inject, forwardRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { NotificationsService } from '../../services/notifications.service';
import { ReportComponent } from '../report/report.component';
import ReportPage from '../../core/report-page';
import { Store } from '../../store/store';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent extends ReportPage implements OnInit {
  
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
