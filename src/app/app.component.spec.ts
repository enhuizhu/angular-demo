import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { WidgetComponent } from './components/widget/widget.component';
import { HomeComponent } from './pages/home/home.component';
import { WatchListComponent } from './pages/watch-list/watch-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotificationsService } from './services/notifications.service';
import { GlTabsModule } from 'glencore-common-ui-lib';
import { GlLoaderModule } from 'glencore-common-ui-lib';
import { GlSearchModule } from 'glencore-common-ui-lib';
import { GlDropdownModule } from 'glencore-common-ui-lib';
import { GlPieChartModule } from 'glencore-common-ui-lib';
import { GlLineChartModule } from 'glencore-common-ui-lib';
import { GlNotificationsModule } from 'glencore-common-ui-lib';
import { UserService } from './services/user.service';
import { HttpService } from './services/http.service';
import { ConfigService } from './services/config.service';
import { OdataService } from './services/odata.service';
import { IoService } from './services/io.service';
import { GmexService } from './modules/gmex/services/gmex.service';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { Store } from './store/store';
import { DataMiddleware } from './middlewares/data.middleware';
// import all the directives
import { OpenInNewWinDirective } from './directives/open-in-new-win.directive';
import { TearOutWindowDirective } from './directives/tear-out-window.directive';

import { DxDataGridModule, DxTooltipModule } from 'devextreme-angular';


describe('AppComponent', () => {
  beforeEach(async(() => {
    const appRoutes = [
      {
        path: '', 
        component: HomeComponent,
        data: {
          title: 'Home',
        },
      },
      { 
        path: 'watch-list', 
        component: WatchListComponent,
        data: { 
          title: 'Ops Watchlist', 
        },
      },
      {
        path: '**', 
        component: 
        NotFoundComponent,
        data: {
          title: '404'
        },
      },
    ];
    
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        WatchListComponent,
        WidgetComponent,
        NotFoundComponent,
        OpenInNewWinDirective,
        TearOutWindowDirective,
      ],
      providers: [
        NotificationsService,
        UserService,
        HttpService,
        ConfigService,
        OdataService,
        GmexService,
        IoService,
        NgRedux,
        Store,
        DataMiddleware,
      ],
      imports: [ 
        GlTabsModule,
        HttpClientModule,
        GlLoaderModule,
        GlSearchModule,
        GlDropdownModule,
        GlPieChartModule,
        DxDataGridModule,
        GlLineChartModule,
        GlNotificationsModule,
        DxTooltipModule,
        CommonModule,
        NgReduxModule,
        RouterModule.forRoot(appRoutes, {enableTracing: false, useHash: true}),
      ],
    }).compileComponents();
  }));

  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
});
