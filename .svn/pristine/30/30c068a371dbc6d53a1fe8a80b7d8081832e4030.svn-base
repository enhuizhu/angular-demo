declare var require: any;

import { Inject, forwardRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { isEmpty } from 'lodash';
import { UPDATING, ERROR, SUCCESS, LOADED_TO_TEPEST } from 'glencore-common-ui-lib';

import { GmexComponent } from '../components/gmex/gmex.component';
import { GmexService } from '../services/gmex.service';
import { NotificationsService } from '../../../services/notifications.service';
import ReportPage from '../../../core/report-page';
import { Store } from '../../../store/store';
import { recieveNotifications } from '../../../actions/notifications.action';
import { height } from '../../../constants/dataGridStyle.constants';

const moment = require('moment');

export class GmexCore extends ReportPage {
  @ViewChild('dataGrid') dataGrid;
  @select() gmex: Observable<any>;
  
  public _store: any;
  public _sub: any;
  public tradeData = [];
  public defines = {};
  public isLoadingData = true;
  public showExportTip = false;
  public tempestLoadedField = 'StatusId';
  public dateFormat = moment.defaultFormat;
  public tempestStatusMap: any;

  public gmexService: GmexService;
  public notificationService: NotificationsService;

  public gridHeight = height;

  constructor(
    store: any,
    route: any,
    parent: any, 
    _gmexService: any,
    _notificationService: any     
  ) {
    super(store.appStore(), route, parent);
    this.gmexService = _gmexService;
    this.notificationService = _notificationService;
    
    this.tempestStatusMap = {
      Pending: {},
      Success: {},
      Fail: {}
    };

    this._store = store.appStore();
    this.setupGmexStoreListener();
  }

  setupGmexStoreListener() {
    try {
      this._sub = this.gmex.subscribe(obj => {
        const isStatusEmpty = this.isStatusEmpty(this.tempestStatusMap);
        
        if (isStatusEmpty
          && !this.isStatusEmpty(obj.tempestStatusMap)
        ) {
          this.tempestStatusMap = obj.tempestStatusMap;
          this.loadGlGrid();          
        }

        if (!isStatusEmpty) {
          this.loadTableData();
        }
      });
    } catch (e) {
      console.log('error', e);
    }
  }

  sendError(msg) {
    this._store.dispatch(recieveNotifications({
      type: 'error',
      text: `${msg}`,
    }));
  }

  /**
   * should be overwritten by child class
   */
  loadGlGrid() {

  }

  /**
   * should be overwritten by child class
   */
  loadTableData() {

  }


  setRecordStatus(item) {
    if (item[this.tempestLoadedField] == this.tempestStatusMap.Pending.Id) {
      item.row_status = UPDATING;
    } else if (item[this.tempestLoadedField] == this.tempestStatusMap.Success.Id) {
      item.row_status = LOADED_TO_TEPEST;
    } else if (item[this.tempestLoadedField] == this.tempestStatusMap.Fail.Id) {
      item.row_status = ERROR;
      item.error_msg = this.tempestStatusMap.Fail.Description;
    }
  }

  isStatusEmpty(obj) {
    if (isEmpty(obj)) {
      return true;
    }

    for (const k in obj) {
      if (isEmpty(obj[k])) {
        return true;
      }
    }

    return false;
  }

  export() {
    if (!this.dataGrid.dataGrid.selectedRowKeys 
      || this.dataGrid.dataGrid.selectedRowKeys.length <= 0) {
      return ;
    }

    this.dataGrid.export();
  }

  sendSuccess(msg) {
    this._store.dispatch(recieveNotifications({
      type: 'success',
      text: `${msg}`,
    }));
  }
}
