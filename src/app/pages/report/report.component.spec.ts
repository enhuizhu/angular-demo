import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportComponent } from './report.component';
import {APP_BASE_HREF} from '@angular/common';
import { GlTabsModule } from 'glencore-common-ui-lib';
import { RouterModule, Routes } from '@angular/router';
import { WatchListComponent } from '../../pages/watch-list/watch-list.component';
import { UpcomingComponent } from '../../pages/upcoming/upcoming.component';
import { CompeletedComponent } from '../../pages/compeleted/compeleted.component';


describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ReportComponent,
        WatchListComponent,
        CompeletedComponent,
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }],
      imports: [ 
        GlTabsModule, 
        RouterModule.forRoot([
          {
            path: '', 
            redirectTo: 'watch-list', 
            pathMatch: 'full'
          },
          { 
            path: 'watch-list', 
            component: WatchListComponent,
            data: { 
              title: 'Ops Watchlist', 
            },
          },
          { 
            path: 'compeleted', 
            component: CompeletedComponent,
            data: { 
              title: 'COMPELETED', 
            },
          }
        ])
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
