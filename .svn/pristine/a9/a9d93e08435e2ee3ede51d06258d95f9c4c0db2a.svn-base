import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { Store } from '../../../../store/store';
import { DataMiddleware } from '../../../../middlewares/data.middleware';
import { SwapComponent } from './swap.component';
import { QueryComponent } from '../query/query.component';
import { TagAutocompeleteStrategyComponent } from '../tag-autocompelete-strategy/tag-autocompelete-strategy.component';
import { HighlightComponent } from '../highlight/highlight.component';
import { UserService } from '../../../../services/user.service';
import { HttpService } from '../../../../services/http.service';
import { ConfigService } from '../../../../services/config.service';
import { NotificationsService } from '../../../../services/notifications.service';
import { OdataService } from '../../../../services/odata.service';
import { GmexService } from '../../../gmex/services/gmex.service';
import { QueryService } from '../../services/query.service';


import {
  GlDataGridModule,
  GlLoaderModule,
  GlTooltipModule,
  GlTabsModule,
  GlDropdownModule,
  DataConverterService
} from 'glencore-common-ui-lib';

import {
  DxCheckBoxModule,
  DxListModule,
  DxTagBoxModule
} from 'devextreme-angular';

const routes: Routes = [
  { 
     path: '', 
     component: QueryComponent,
     data: {
       title: 'QUERY'
     },
     children: [
       {
         path: '',
         redirectTo: 'swap',
         pathMatch: 'full'
       },
       {
         path: 'swap',
         component: SwapComponent
       }
     ]
   },
 ];


describe('SwapComponent', () => {
  let component: SwapComponent;
  let fixture: ComponentFixture<SwapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        GlDataGridModule, 
        GlLoaderModule, 
        GlTooltipModule,
        DxCheckBoxModule,
        DxTagBoxModule, 
        HttpClientModule,
        GlTabsModule,
        GlDropdownModule,
        DxListModule,
        RouterModule.forRoot(routes) 
      ],
      providers: [ 
        Store, 
        DataMiddleware, 
        UserService, 
        HttpService, 
        ConfigService, 
        NotificationsService, 
        OdataService, 
        GmexService,
        QueryService,
        QueryComponent,
        DataConverterService,
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
      declarations: [ 
        SwapComponent, 
        QueryComponent, 
        TagAutocompeleteStrategyComponent,
        HighlightComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
