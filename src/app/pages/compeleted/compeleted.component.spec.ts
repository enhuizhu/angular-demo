import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { GlTabsModule } from 'glencore-common-ui-lib';
import { CompeletedComponent } from './compeleted.component';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { NotificationsService } from '../../services/notifications.service';
import { UserService } from '../../services/user.service';
import { HttpService } from '../../services/http.service';
import { ConfigService } from '../../services/config.service';
import { OdataService } from '../../services/odata.service';
import { Store } from '../../store/store';
import { DataMiddleware } from '../../middlewares/data.middleware';
import { ReportComponent } from '../report/report.component';

describe('CompeletedComponent', () => {
  let component: CompeletedComponent;
  let fixture: ComponentFixture<CompeletedComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ 
        CompeletedComponent,
        ReportComponent,
      ],
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
        RouterTestingModule.withRoutes([{path: '', component: CompeletedComponent}]),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompeletedComponent);
    component = fixture.componentInstance;
    spyOn(component, 'setActiveTab');
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
