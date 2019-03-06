declare var require: any;

import { Component, OnInit, ViewChild } from '@angular/core';
import Page from '../../../../core/page';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../../../../store/store';
import { GmexService } from '../../services/gmex.service';
import { QueueService } from '../../services/queue.service';
import { NotificationsService } from '../../../../services/notifications.service';
import { UPDATING, ERROR, SUCCESS, LOADED_TO_TEPEST } from 'glencore-common-ui-lib';
import { BACKEND_LOADED_TO_TEMPEST } from '../../../../constants/socket.constants';
import {
  GMEX_LOADED_CHANGE, 
  getGmexStatus,
  changeGmexLoaded,
  changeGmexDateRange,
  refreshGmexData,
} from '../../../../actions/gmex.action';


const moment = require('moment');
const DATE_FORMAT = 'YYYY-MM-DD';
const now = new Date();

@Component({
  selector: 'app-gmex',
  templateUrl: './gmex.component.html',
  styleUrls: ['./gmex.component.scss']
})
export class GmexComponent implements OnInit {
  @ViewChild('dataGrid') dataGrid;
  @ViewChild('dropdown') dropdown;
  
  public loadedSelected = true;
  public notLoadedSelected = true;
  public dateRangeTitle = 'Today';
  private _store;
  
  public tabTitles = [
    {
      title: 'T-2',
      href: '#/gmex/t-2',
      active: true,
    },
    {
      title: 'T-1',
      href: '#/gmex/t-1',
      active: true,
    },
    {
      title: 'BoL',
      href: '#/gmex/bol',
      active: false,
    }
  ];

  constructor(    
    store: Store
  ) { 
    this._store = store.appStore();
  }

  ngOnInit() {
    this._store.dispatch(getGmexStatus());
  }

  getLoadedValue() {
    if (this.loadedSelected && this.notLoadedSelected) {
      return null;
    }

    if (this.loadedSelected) {
      return true;
    }

    if (this.notLoadedSelected) {
      return false;
    }

    return undefined;
  }

  loadedChange() {
    const loaded = this.getLoadedValue();
    this._store.dispatch(changeGmexLoaded(loaded));
  }

  refresh() {
    this._store.dispatch(refreshGmexData());
  }

  onDateRangeSelected(range) {
    this.dropdown.showDropdownBox = false;

    if (range.label !== 'custom') {
      this.dateRangeTitle = range.label;
    } else {
      this.dateRangeTitle = moment(range.dateRange[0]).format('DD MMM') + ' - ' + moment(range.dateRange[1]).format('DD MMM');
    }

    this._store.dispatch(changeGmexDateRange({
      start: range.dateRange[0],
      end: range.dateRange[1]
    }));
  }

  onTabSwitch(data) {
    console.log('switch call back', data);
  }
}
