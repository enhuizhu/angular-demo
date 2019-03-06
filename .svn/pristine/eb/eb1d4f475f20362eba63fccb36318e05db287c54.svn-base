import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteStrategyComponent } from './autocomplete-strategy.component';
import { HighlightComponent } from '../highlight/highlight.component';
import { QueryService } from '../../services/query.service';
import { ConfigService } from '../../../../services/config.service';
import { HttpService } from '../../../../services/http.service';

import { DxAutocompleteModule } from 'devextreme-angular';
import { GlLoaderModule } from 'glencore-common-ui-lib';


describe('AutocompleteStrategyComponent', () => {
  let component: AutocompleteStrategyComponent;
  let fixture: ComponentFixture<AutocompleteStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DxAutocompleteModule, GlLoaderModule, HttpClientModule ],
      providers: [ QueryService, ConfigService, HttpService ],
      declarations: [ AutocompleteStrategyComponent, HighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
