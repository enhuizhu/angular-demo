import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { WatchListComponent } from './watch-list.component';
import { GlTabsModule } from 'glencore-common-ui-lib';
import { AppComponent } from '../../app.component';
import { NotificationsService } from '../../services/notifications.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user.service';
import { HttpService } from '../../services/http.service';
import { ConfigService } from '../../services/config.service';
import { OdataService } from '../../services/odata.service';
import { Store } from '../../store/store';
import { DataMiddleware } from '../../middlewares/data.middleware';
import { ReportComponent } from '../report/report.component';

describe('WatchListComponent', () => {
  let component: WatchListComponent;
  let fixture: ComponentFixture<WatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchListComponent ],
      providers: [ 
        NotificationsService,
        Store,
        DataMiddleware,
        UserService,
        HttpService, 
        ConfigService,
        OdataService,
        ReportComponent
      ],
      imports: [ 
        GlTabsModule,
        HttpClientModule, 
        RouterTestingModule.withRoutes([{path: '', component: WatchListComponent}]),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
