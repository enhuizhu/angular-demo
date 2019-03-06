import { Component, AfterViewInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'lodash';
import { select } from '@angular-redux/store';
import { NotificationsService } from '../../services/notifications.service';
import { OdataService } from '../../services/odata.service';
import ReportPage from '../../core/report-page';
import { Inject, forwardRef } from '@angular/core';
import { ReportComponent } from '../report/report.component';
import { Store } from '../../store/store';
import { getUpcomingDataDefinition } from '../../actions/reportUpcomingData.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent extends ReportPage implements AfterViewInit, OnDestroy {
  @select() upcomingData: Observable<any>;
  @select() upcomingDataLoader: Observable<any>;

  private sub: any;
  private laoderSub: any;
  private _store: any;
  public dataDefinitions: object[] = [];
  public dataSource: object[] = [];
  public isLoading = true;
  
  constructor( 
    store: Store,
    route: ActivatedRoute, 
    @Inject(forwardRef(() => ReportComponent)) parent: ReportComponent 
  ) {
    super(store.appStore(), route, parent);    
    this._store = store.appStore();
    this.setupListeners();
  }

  setupListeners() {
    this.sub = this.upcomingData.subscribe(obj => {
      if (!isEmpty(obj.dataDefinitions)) {
        this.dataDefinitions = obj.dataDefinitions;
      }

      if (!isEmpty(obj.data)) {
        this.dataSource = obj.data;
      }
    });

    this.laoderSub = this.upcomingDataLoader.subscribe(isLoading => {
      console.log('isLoading', isLoading);
      // this.isLoading = isLoading;
    });
  }

  ngAfterViewInit() {
    this._store.dispatch(getUpcomingDataDefinition());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.laoderSub.unsubscribe();
  }
}
