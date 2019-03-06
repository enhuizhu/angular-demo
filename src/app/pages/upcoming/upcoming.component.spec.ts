import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '../../store/store';
import { DataMiddleware } from '../../middlewares/data.middleware';
import { UpcomingComponent } from './upcoming.component';
import { ReportComponent } from '../../pages/report/report.component';
import { AppComponent } from '../../app.component';
import { NotificationsService } from '../../services/notifications.service';
import { OdataService } from '../../services/odata.service';
import { ConfigService } from '../../services/config.service';
import { HttpService } from '../../services/http.service';
import { UserService } from '../../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { GlTabsModule } from 'glencore-common-ui-lib';
import { GlDataGridModule } from 'glencore-common-ui-lib';
import { GlLoaderModule } from 'glencore-common-ui-lib';

describe('UpcomingComponent', () => {
  let component: UpcomingComponent;
  let fixture: ComponentFixture<UpcomingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingComponent ],
      providers: [ 
        UserService,
        OdataService,
        HttpService,
        ConfigService,
        NotificationsService,
        Store,
        DataMiddleware, 
        ReportComponent,
      ],
      imports: [ 
        HttpClientModule,
        GlTabsModule, 
        GlDataGridModule,
        GlLoaderModule,
        RouterTestingModule.withRoutes([{path: '', component: UpcomingComponent}]),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();    
  });

  // it('should create', () => {
  //   // console.log(component);
  //   // spyOn(component, 'getDataGridData');
  //   // expect(component).toBeTruthy();
  // });
});
