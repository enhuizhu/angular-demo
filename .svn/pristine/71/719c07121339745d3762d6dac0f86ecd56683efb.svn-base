import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryComponent } from './query.component';
import { TagAutocompeleteStrategyComponent } from '../tag-autocompelete-strategy/tag-autocompelete-strategy.component';
import { HighlightComponent } from '../highlight/highlight.component';
import { QueryFormComponent } from '../query-form/query-form.component';

import { RouterTestingModule } from '@angular/router/testing';
import { QueryService } from '../../services/query.service';
import { ConfigService } from '../../../../services/config.service';
import { HttpService } from '../../../../services/http.service';
import { Store } from '../../../../store/store';
import { DataMiddleware } from '../../../../middlewares/data.middleware';
import { UserService } from '../../../../services/user.service';
import { NotificationsService } from '../../../../services/notifications.service';
import { OdataService } from '../../../../services/odata.service';
import { GmexService } from '../../../gmex/services/gmex.service';

import {
  GlTabsModule,
  GlDropdownModule,
  GlLoaderModule
} from 'glencore-common-ui-lib';

import {
  DxTagBoxModule,
  DxCheckBoxModule,
  DxListModule,
  DxPopoverModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import { CompileNgModuleMetadata } from '@angular/compiler';


fdescribe('QueryComponent', () => {
  let component: QueryComponent;
  let fixture: ComponentFixture<QueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        QueryComponent,
        TagAutocompeleteStrategyComponent,
        HighlightComponent,
        QueryFormComponent,
      ],
      providers: [
        QueryService,
        ConfigService,
        HttpService,
        DataMiddleware,
        Store,
        UserService,
        NotificationsService,
        OdataService,
        GmexService
      ],
      imports: [ 
        GlTabsModule, 
        DxTagBoxModule,
        GlDropdownModule,
        GlLoaderModule,
        DxListModule,
        HttpClientModule,
        DxCheckBoxModule,
        DxPopoverModule,
        DxScrollViewModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{path: '', component: QueryComponent}]),         
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryComponent);
    component = fixture.componentInstance;
    spyOn(component, 'refreshSavedSearch').and.callFake(() => {});

    fixture.detectChanges();

    // spyOn(component.queryService, 'getSwapSavedSearch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getFiltersBaseOnSavedSerch', () => {
    const searchs = {
      'TradeRef': [1, 2],
      'StrategyRef': [2, 3]
    };

    expect(component.getFiltersBaseOnSavedSerch(searchs)).toEqual(component.filters.slice(0, 2));
  });
});
