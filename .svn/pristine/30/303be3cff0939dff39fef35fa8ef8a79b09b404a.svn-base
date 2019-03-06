import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TagAutocompeleteStrategyComponent } from './tag-autocompelete-strategy.component';
import { HighlightComponent } from '../highlight/highlight.component';

import { DxTagBoxModule } from 'devextreme-angular';
import { GlLoaderModule } from 'glencore-common-ui-lib';
import { QueryService } from '../../services/query.service';
import { ConfigService } from '../../../../services/config.service';
import { HttpService } from '../../../../services/http.service';

describe('TagAutocompeleteStrategyComponent', () => {
  let component: TagAutocompeleteStrategyComponent;
  let fixture: ComponentFixture<TagAutocompeleteStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagAutocompeleteStrategyComponent, HighlightComponent ],
      imports: [ DxTagBoxModule, GlLoaderModule, HttpClientModule ],
      providers: [ QueryService, ConfigService, HttpService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagAutocompeleteStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
