declare var require: any;

import { Component, OnInit, Inject, forwardRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { select } from '@angular-redux/store';
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'lodash';
import { RECORD_MODIFIED } from 'glencore-common-ui-lib';
import ReportPage from '../../../../core/report-page';
import { Store } from '../../../../store/store';
import { QueryComponent } from '../query/query.component';
import { QueryService } from '../../services/query.service';
import { height } from '../../../../constants/dataGridStyle.constants';
import { AutocompleteStrategyComponent } from '../autocomplete-strategy/autocomplete-strategy.component';
import { builderFiltersBaseOnColumns } from '../../../../helpers/queryBuilder';

const moment = require('moment');

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss']
})
export class SwapComponent extends ReportPage implements OnInit {
  @ViewChild('dataGrid') dataGrid;
  @select() query: Observable<any>;
  
  public dataSource = [];
  public defines = {};
  // public strategies = [];
  public filterStr = '';
  public isLoadingData = false;
  public showExportTip = false;
  public dateFormat = moment.defaultFormat;
  public gridHeight = height;

  private _sub: any;
  private _store: any;
  
  constructor(
    store: Store,
    route: ActivatedRoute,
    private queryService: QueryService,
    @Inject(forwardRef(() => QueryComponent)) parent: QueryComponent,        
  ) { 
    super(store.appStore(), route, parent);
    this._store = store.appStore();
    this.setupQueryStoreListener();
  }

  ngOnInit() {
  
  }

  setupQueryStoreListener() {
    try {
      this._sub = this.query.subscribe(obj => {
        console.log('query store:', obj);
        if (isEmpty(obj.filters)) {
          return ;
        }

        this.filterStr = builderFiltersBaseOnColumns(obj.filters);

        console.log('filter str:', this.filterStr);
        if (isEmpty(this.defines)) {
          this.loadGlGrid();
        } else {
          this.loadTableData();
        }
      });
    } catch (e) {
      console.log(e);
    }

  }

  loadGlGrid() {
    this.queryService.getSwapDataDefinitions().then(defs => {
      defs.StrategyRef.component = AutocompleteStrategyComponent;
      this.defines = defs;
      this.loadTableData();
    });    
  }

  loadTableData() {
    this.isLoadingData = true;
    
    this.queryService.getTradesBaseOnFilters(this.filterStr).then(results => {
      this.isLoadingData = false;
      this.dataSource = results;
    });
  }

  saveChanges() {
    // get all the rows that has been modified
    this.dataSource.filter(v => {
      return v.row_status === RECORD_MODIFIED;
    }).map(v => {
      const changes = this.dataGrid.getChangesById(v.TradeNumber);
      console.log('changes', changes);
    });
  }

  cancel() {
    if (confirm('do you really want to discard all the changes?')) {
      this.dataGrid.revertAll();
    }
  }
}
