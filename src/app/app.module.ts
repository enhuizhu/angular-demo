import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { OpenInNewWinDirective } from './directives/open-in-new-win.directive';
import { ConfigService } from './services/config.service';
import { OdataService } from './services/odata.service';
import { DockerService } from './services/docker.service';
import { GmexService } from './modules/gmex/services/gmex.service';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { DataMiddleware } from './middlewares/data.middleware';
import { rootReducer } from './reducers/index.reducer';
import { Store } from './store/store';
import { AppRouterModule } from './app.routes';
/**
 * import all the necessary actions
 */
import { getUserInfo } from './actions/userinfo.action';


/**
 * import all the external modules
 */
import { 
  GlTabsModule,
  GlDataGridModule,
  GlLoaderModule,
  GlSearchModule,
  GlDropdownModule,
  GlPieChartModule,
  GlNotificationsModule,
  GlLineChartModule,
  GlDatePickerModule,
  DataConverterService
} from 'glencore-common-ui-lib';

/** 
* import devextream module 
*/
import { 
  DxDataGridModule,
  DxTooltipModule,
  DxTemplateModule,
} from 'devextreme-angular';

/**
 * import all the services
 */
import { NotificationsService } from './services/notifications.service';
import { UserService  } from './services/user.service';
import { HttpService } from './services/http.service';
import { ContractsService } from './services/contracts.service';
import { InvoiceService } from './services/invoice.service';
import { TradeService } from './services/trade.service';
import { SettingService } from './services/setting.service';
import { IoService } from './services/io.service';

/**
 * import all the page components
 */
import { HomeComponent } from './pages/home/home.component';
import { WatchListComponent } from './pages/watch-list/watch-list.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';
import { CompeletedComponent } from './pages/compeleted/compeleted.component';
import { ReportComponent } from './pages/report/report.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
/**
 * import all the components
 */
import { WidgetComponent } from './components/widget/widget.component';
import { HeaderComponent } from './components/header/header.component';

/**
 * import all the directives
 */
import { TearOutWindowDirective } from './directives/tear-out-window.directive';
import { WinControlDirective } from './directives/win-control.directive';

const initConfig = function(config: ConfigService) {
  return () => {
    return config.loadConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    WatchListComponent,
    OpenInNewWinDirective,
    UpcomingComponent,
    CompeletedComponent,
    ReportComponent,
    TearOutWindowDirective,
    WinControlDirective,
    WidgetComponent,
  ],
  imports: [
    AppRouterModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    GlTabsModule,
    GlDataGridModule,
    GlLoaderModule,
    GlSearchModule,
    GlDropdownModule,
    GlPieChartModule,
    GlLineChartModule,
    GlNotificationsModule,
    GlDatePickerModule,
    DxDataGridModule,
    DxTooltipModule,
    DxTemplateModule,
    NgReduxModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      multi: true,
      deps: [ConfigService]
    },
    NotificationsService, 
    ConfigService,
    UserService,
    HttpService,
    OdataService,
    ContractsService,
    InvoiceService,
    TradeService,
    DockerService,
    SettingService,
    IoService,
    GmexService,
    DataConverterService,
    DataMiddleware,
    Store,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(ngRedux: NgRedux<any>, dataMiddleware: DataMiddleware, store: Store) {
    const _store = store.appStore();
    ngRedux.provideStore(_store);
  }
}
