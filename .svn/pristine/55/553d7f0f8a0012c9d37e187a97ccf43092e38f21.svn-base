import { Component, OnInit, Inject, forwardRef, OnDestroy} from '@angular/core';
import { select } from '@angular-redux/store';
import { ActivatedRoute } from '@angular/router';

import { GmexCore } from '../../core/gmex-core';
import { GmexComponent } from '../gmex/gmex.component';
import { Store } from '../../../../store/store';
import { NotificationsService } from '../../../../services/notifications.service';
import { GmexService } from '../../services/gmex.service';


@Component({
  selector: 'app-tminus-one',
  templateUrl: './tminus-one.component.html',
  styleUrls: ['./tminus-one.component.scss']
})
export class TminusOneComponent extends GmexCore implements OnInit, OnDestroy {

  constructor(
    store: Store,
    route: ActivatedRoute,
    @Inject(forwardRef(() => GmexComponent)) parent: GmexComponent,        
    gmexService: GmexService,
    notificationService: NotificationsService,
  ) { 
    super(store, route, parent, gmexService, notificationService); 
  }

  loadGlGrid() {
    this.gmexService.getTMinusOneDataDefinition().then(defines => {
      this.defines = defines;
      this.loadTableData();
    });
  }

  loadTableData() {
    const state = this._store.getState();
    const loaded = state.gmex.loaded;
    const startDate = state.gmex.dateRange.start;
    const endDate = state.gmex.dateRange.end;
    
    if (typeof loaded === 'undefined') {
      this.tradeData = [];
      return ;
    }

    this.isLoadingData = true;

    this.gmexService.getDataTMinusTwo(startDate, endDate, loaded, this.tempestStatusMap.Success.Id).then(results => {
      this.isLoadingData = false;
      
      this.tradeData = results.value.map(item => {
        this.setRecordStatus(item);
        return item;
      });
    }).catch(e => {
      this.sendError('there is a error on fetching gmex data.');
    });
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
