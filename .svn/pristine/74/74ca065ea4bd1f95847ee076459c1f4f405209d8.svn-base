import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found.component';
import { NotificationsService } from '../../services/notifications.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user.service';
import { HttpService } from '../../services/http.service';
import { ConfigService } from '../../services/config.service';
import { OdataService } from '../../services/odata.service';
import { Store } from '../../store/store';
import { DataMiddleware } from '../../middlewares/data.middleware';


describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      providers: [ 
        NotificationsService,
        Store,
        DataMiddleware,
        UserService,
        HttpService, 
        ConfigService,
        OdataService, 
      ],
      imports: [ 
        HttpClientModule,
        RouterTestingModule.withRoutes([{path: '', component: NotFoundComponent}]) 
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
