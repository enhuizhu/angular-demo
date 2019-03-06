import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GmexRouterModule } from './gmex.route';
import { TminusTwoComponent } from './components/tminus-two/tminus-two.component';
import { GmexComponent } from './components/gmex/gmex.component';
import { BolComponent } from './components/bol/bol.component';
import { QueueService } from './services/queue.service';
/**
 * import all the external modules
 */
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
import { TminusOneComponent } from './components/tminus-one/tminus-one.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DxTooltipModule,
    GmexRouterModule,
    GlTabsModule,
    GlDataGridModule,
    GlLoaderModule,
    GlDropdownModule,
    GlNotificationsModule,
    GlDatePickerModule,
    GlTooltipModule,
  ],
  providers: [
    DataConverterService,
    QueueService
  ],
  declarations: [GmexComponent, BolComponent, TminusTwoComponent, TminusOneComponent]
})
export class GmexModule { }
