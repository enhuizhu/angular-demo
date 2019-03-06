import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { GmexRouterModule } from '../../gmex.route';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TminusTwoComponent } from './tminus-two.component';
import { TminusOneComponent } from '../tminus-one/tminus-one.component';
import { BolComponent } from '../bol/bol.component';
import { GmexComponent } from '../gmex/gmex.component';
import { Store } from '../../../../store/store';
import { GmexService } from '../../services/gmex.service';
import { QueueService } from '../../services/queue.service';
import { NotificationsService } from '../../../../services/notifications.service';
import { UserService } from '../../../../services/user.service';
import { HttpService } from '../../../../services/http.service';
import { ConfigService } from '../../../../services/config.service';
import { OdataService } from '../../../../services/odata.service';
import { DataMiddleware} from '../../../../middlewares/data.middleware';
import { HttpClientModule } from '@angular/common/http';
import { CompileNgModuleMetadata } from '@angular/compiler';
import { 
  GlTabsModule,
  GlDataGridModule,
  GlLoaderModule,
  GlDropdownModule,
  GlNotificationsModule,
  GlDatePickerModule,
  GlTooltipModule,
  DataConverterService
} from 'glencore-common-ui-lib';

import { 
  DxTooltipModule,
} from 'devextreme-angular';

describe('TminusTwoComponent', () => {
  let component: TminusTwoComponent;
  let fixture: ComponentFixture<TminusTwoComponent>;
  
  const routes: Routes = [
    { 
       path: '', 
       component: GmexComponent,
       data: {
         title: 'GMEX'
       },
       children: [
         {
           path: '',
           redirectTo: 't-2',
           pathMatch: 'full'
         },
         {
           path: 't-2',
           component: TminusTwoComponent
         },
         {
           path: 't-1',
           component: TminusOneComponent
         },
         {
           path: 'bol',
           component: BolComponent
         }
       ]
     },
   ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TminusTwoComponent, GmexComponent, TminusOneComponent, BolComponent ],
      providers: [ 
        GmexService, 
        QueueService, 
        NotificationsService, 
        Store, 
        DataMiddleware,
        UserService,
        HttpService,
        ConfigService,
        OdataService,
        DataConverterService,
        GmexComponent,
        // ActivatedRoute,
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
      imports: [
        HttpClientModule,
        RouterModule.forRoot(routes),
        // GmexRouterModule,
        GlDataGridModule,
        GlLoaderModule,
        GlDropdownModule,
        DxTooltipModule,
        GlDatePickerModule,
        FormsModule,
        GlTabsModule,
        GlTooltipModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TminusTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isStatusEmpty', () => {
    // expect(component.isStatusEmpty({a:{}})).toBeTruthy();
    // expect(component.isStatusEmpty({a:{id: 1}})).toBeFalsy();
  });
});
