declare var require: any;

import { Component, OnInit, ViewChild, OnDestroy, Inject, forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GmexService } from '../../services/gmex.service';
import { QueueService } from '../../services/queue.service';
import { NotificationsService } from '../../../../services/notifications.service';
import { UPDATING, ERROR, SUCCESS, LOADED_TO_TEPEST } from 'glencore-common-ui-lib';
import { BACKEND_LOADED_TO_TEMPEST } from '../../../../constants/socket.constants';
import { Store } from '../../../../store/store';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { isEmpty } from 'lodash';
import { GmexComponent } from '../gmex/gmex.component';
import { GmexCore } from '../../core/gmex-core';

const moment = require('moment');

@Component({
  selector: 'app-tminus-two',
  templateUrl: './tminus-two.component.html',
  styleUrls: ['./tminus-two.component.scss']
})
export class TminusTwoComponent extends GmexCore implements OnInit, OnDestroy {
  
  public showTempestTip = false;
  
  constructor(
    store: Store,
    route: ActivatedRoute,
    @Inject(forwardRef(() => GmexComponent)) parent: GmexComponent,        
    gmexService: GmexService,
    notificationService: NotificationsService,
    private queueService: QueueService
  ) {
    super(store, route, parent, gmexService, notificationService);
  }

  ngOnInit() {
  }

  setupListeners() {
    this.notificationService.sub(BACKEND_LOADED_TO_TEMPEST, (data) => {
      const record = JSON.parse(data);

      this.queueService.markQItemAsMoved(record.id);
      
      if (!record.success) {
        this.queueService.markQitemAsFailed(record.id);
      }

      if (this.queueService.shouldRemoveQueue()) {
        const analytic = this.queueService.getQueueAnalytic();
        
        if (analytic.success > 0) {
          this.sendSuccess(`${analytic.success} records has been loaded to tempest`);
        }

        if (analytic.fail > 0) {
          this.sendError(`${analytic.fail} records has failed loaded to tempest`);
        }

        setTimeout(() => {
          // this.selectedRowsInTheQueue();
          this.queueService.emptyQueue();        
        }, 100);
      }

      this.updateRecord(record);
    });
  }

  loadGlGrid() {
    this.gmexService.getTMinusTwoDataDefinition().then(defines => {
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

  updateRecord(record) {
    // should check id exist in current array
    const item = this.tradeData.find(d => d.Id == record.id);

    if (item) {
      this.gmexService.getTMinusTwoRecordById(record.id).then(result => {
        this.setRecordStatus(result);
        Object.assign(item, result);
      });
    }
  }

  loadToTempest() {
    if (!this.dataGrid.dataGrid.selectedRowKeys 
      || this.dataGrid.dataGrid.selectedRowKeys.length <= 0) {
      return ;
    }

    this.queueService.addToQueue(this.dataGrid.selectedRows);

    this.dataGrid.selectedRows.map(row => {
      const changes =  this.dataGrid.getChangesById(row.Id);
      
      Object.assign(changes, {LastUpdate: row.LastUpdate});

      this.gmexService.loadToTempest(row.Id, changes).then(result => {
        this.dataGrid.resetEditColState(row);
        this.dataGrid.restoreRecord(row);
      }).catch(e => {
        this.dataGrid.resetEditColState(row);
        this.dataGrid.restoreRecord(row);
        row.row_status = ERROR;
        row.error_msg = JSON.parse(e._body).value;
      });
      
      row.row_status = UPDATING;
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
