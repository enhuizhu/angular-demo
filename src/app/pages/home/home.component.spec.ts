import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { WidgetComponent } from '../../components/widget/widget.component';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { NotificationsService } from '../../services/notifications.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user.service';
import { HttpService } from '../../services/http.service';
import { ConfigService } from '../../services/config.service';
import { OdataService } from '../../services/odata.service';
import { ContractsService } from '../../services/contracts.service';
import { TradeService } from '../../services/trade.service';
import { SettingService } from '../../services/setting.service';
import { InvoiceService } from '../../services/invoice.service';
import { DockerService } from '../../services/docker.service';
import { GmexService } from '../../modules/gmex/services/gmex.service';
import { Store } from '../../store/store';
import { DataMiddleware } from '../../middlewares/data.middleware';
import { OpenInNewWinDirective } from '../../directives/open-in-new-win.directive';
import { TearOutWindowDirective } from '../../directives/tear-out-window.directive';
import { 
  GlTabsModule,
  GlPieChartModule,
  GlLineChartModule,
  GlLoaderModule,
  GlDataGridModule,
} from 'glencore-common-ui-lib';

import { 
  DxDataGridModule,
  DxTooltipModule,
} from 'devextreme-angular';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent,
        WidgetComponent,
        OpenInNewWinDirective,
        TearOutWindowDirective, 
      ],
      providers: [ 
        NotificationsService,
        Store,
        DataMiddleware,
        UserService,
        HttpService, 
        ConfigService,
        OdataService,
        ContractsService,
        SettingService,
        InvoiceService,
        TradeService,
        DockerService,
        GmexService,
      ],
      imports: [ 
        HttpClientModule,
        GlTabsModule,
        GlPieChartModule,
        GlLineChartModule,
        GlLoaderModule,
        GlDataGridModule,
        DxDataGridModule,
        DxTooltipModule,
        RouterTestingModule.withRoutes([{path: '', component: HomeComponent}]) 
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
