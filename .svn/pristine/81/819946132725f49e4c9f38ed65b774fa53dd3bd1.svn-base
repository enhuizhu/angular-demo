import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsService } from '../../services/notifications.service';
import { HeaderComponent } from './header.component';
import { GlSearchModule } from 'glencore-common-ui-lib';
import { GlDropdownModule } from 'glencore-common-ui-lib';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ GlSearchModule, GlDropdownModule ],
      providers: [ NotificationsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
