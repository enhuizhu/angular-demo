import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryComponent } from './components/query/query.component';
import { QueryRouterModule } from './query.route';
import { SwapComponent } from './components/swap/swap.component';
import { QueryService } from './services/query.service';

/**
 * import all the external modules
 */
import { 
  GlTabsModule,
  GlDataGridModule,
  GlLoaderModule,
  GlTooltipModule,
  GlDropdownModule,
  DataConverterService
} from 'glencore-common-ui-lib';


import {
  DxTagBoxModule,
  DxTooltipModule,
  DxAutocompleteModule,
  DxListModule,
  DxCheckBoxModule,
  DxPopoverModule,
  DxScrollViewModule
} from 'devextreme-angular';
import { AutocompleteStrategyComponent } from './components/autocomplete-strategy/autocomplete-strategy.component';
import { TagAutocompeleteStrategyComponent } from './components/tag-autocompelete-strategy/tag-autocompelete-strategy.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { QueryFormComponent } from './components/query-form/query-form.component';

@NgModule({
  imports: [
    CommonModule,
    QueryRouterModule,
    GlTabsModule,
    GlDataGridModule,
    GlLoaderModule,
    DxTagBoxModule,
    DxTooltipModule,
    DxAutocompleteModule,
    GlTooltipModule,
    GlDropdownModule,
    DxListModule,
    DxCheckBoxModule,
    DxPopoverModule,
    DxScrollViewModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataConverterService,
    QueryService
  ],
  entryComponents: [
    AutocompleteStrategyComponent
  ],
  declarations: [
    QueryComponent, 
    SwapComponent, 
    AutocompleteStrategyComponent, 
    TagAutocompeleteStrategyComponent, 
    HighlightComponent, 
    QueryFormComponent
  ]
})
export class QueryModule { }
