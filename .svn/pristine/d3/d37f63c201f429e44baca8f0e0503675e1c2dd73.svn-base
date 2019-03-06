import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit, isDevMode } from '@angular/core';
import { QueryService } from '../../services/query.service';
import { ActivatedRoute, Router, ChildActivationEnd, NavigationEnd } from '@angular/router';
import { TagAutocompeleteStrategyComponent } from '../../components/tag-autocompelete-strategy/tag-autocompelete-strategy.component';
import { Store } from '../../../../store/store';
import { DxListComponent } from 'devextreme-angular';
import { DxPopoverComponent } from 'devextreme-angular';
import { recieveNotifications } from '../../../../actions/notifications.action';

import {
  changeQueryFilters
} from '../../../../actions/query.action';

import { isEmpty } from 'lodash';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {
  @ViewChild('searchFields') searchFields: DxListComponent;
  @ViewChild('popover') popover: DxPopoverComponent; 
  @ViewChildren(TagAutocompeleteStrategyComponent) tagBoxes: QueryList<TagAutocompeleteStrategyComponent>;
  
  public tabTitles = [
    {
      title: 'Swaps',
      href: '#/query/swap',
      active: true,
    }
  ];

  public savedSearchs = [
  ];

  public filters = [
    {
      label: 'Trade Number',
      key: 'TradeRef',
      type: 'tags',
      searchExpr: ['TradeRef'],
      displayExpr: 'TradeRef',
      valueExpr: 'TradeRef',
      highLightFirstPart: 'TradeRef',
      highLightSecondPart: false,
      dataServiceName: 'getTradeNumberStartWith'
    },
    {
      label: 'Strategy',
      key: 'StrategyRef',
      type: 'tags',
      searchExpr: ['Number', 'Name'],
      displayExpr: 'Number',
      valueExpr: 'Number',
      highLightFirstPart: 'Number',
      highLightSecondPart: 'Name',
      dataServiceName: 'getStrategiesStartWith'
    },
    {
      label: 'Trader',
      key: 'Trader',
      type: 'tags',
      searchExpr: ['Username', 'Name'],
      displayExpr: 'Username',
      valueExpr: 'Username',
      highLightFirstPart: 'Username',
      highLightSecondPart: 'Name',
      dataServiceName: 'getTraders',
      getAllRecord: true
    },
    {
      label: 'Trader Date',
      key: 'TradeDate',
      type: 'date'
    },
    {
      label: 'Internal Company',
      key: 'internal_co_cd',
      type: 'tags',
      searchExpr: ['internal_co_cd', 'internal_co_name'],
      displayExpr: 'internal_co_cd',
      valueExpr: 'internal_co_cd',
      highLightFirstPart: 'internal_co_cd',
      highLightSecondPart: 'internal_co_name',
      dataServiceName: 'getInternalCompanies',
      getAllRecord: true,
    }
  ];

  public selectedFilters = [];
  public selectAll = false;
  public currentPage = '';
  public path = '';
  public searchName = '';
  public savedSwapObj = {};
  private _stroe;

  constructor(
    store: Store,
    activeRoute: ActivatedRoute,
    route: Router,    
    private queryService: QueryService
  ) {
    this._stroe = store.appStore();

    route.events.forEach((v: any) => {
      if (v instanceof NavigationEnd) {
        this.path = activeRoute.snapshot.children[0].routeConfig.path;
        
        if (!isEmpty(activeRoute.snapshot.queryParams.name)) {
          this.searchName = activeRoute.snapshot.queryParams.name;
        }

        console.log(this.path, this.searchName);
        this.refreshSavedSearch(() => {
          this.loadSavedFilters().then((needLoadData: boolean) => {
            if (needLoadData) {
              this.changeStrategies();
            }
          });
        });        
      }
    });
  }

  ngOnInit() {
  }

  loadSavedFilters() {
    return new Promise((resolve, reject) => {
      if (isEmpty(this.savedSwapObj) 
        || isEmpty(this.searchName)) {
        resolve(false) ;
      }
      
      this.selectedFilters = this.getFiltersBaseOnSavedSerch(this.savedSwapObj[this.searchName]);
    
      setTimeout(() => {
        const keys = Object.keys(this.savedSwapObj[this.searchName]);
        
        this.tagBoxes.map((tagBox, index) => {
          console.log('values:', this.savedSwapObj[this.searchName][keys[index]]);
          tagBox.setItemsAndValues(this.savedSwapObj[this.searchName][keys[index]].value);
          
          setTimeout(() => {
            tagBox.items = [];
          }, 100);
        });

        resolve(true);
      }, 0);
    });
  }

  refreshSavedSearch(callback: Function = null) {
    this.queryService.getSwapSavedSearch().then(results => {
      if (results.swap) {
        this.savedSwapObj = results.swap;
        this.savedSearchs = [];
        
        Object.keys(results.swap).map(k => {
          this.savedSearchs.push(k);
        });                
      }

      if (callback) {
        callback();
      }
    }).catch(e => {
      this.sendError(e);
    });
  }

  onSearchAllChanged(e) {
    if (!e.event) {
      return ;
    }
    
    this.selectAll = e.value;

    if (this.selectAll) {
      this.searchFields.instance.selectAll();
    } else {
      this.searchFields.instance.unselectAll();
    }
  }

  onSearchOptionChanged(e) {
    this.selectAll = this.selectedFilters.length === this.filters.length;
  }

  changeStrategies() {
    const filters = this.getCurrentFilters(true);
    this._stroe.dispatch(changeQueryFilters(filters));
  }

  getCurrentFilters(noOperator: boolean = false) {
    const filters = {};

    this.tagBoxes.map(tagbox => {
      filters[tagbox.key] = noOperator ? 
        tagbox.selectedItems : 
        {
          value: tagbox.selectedItems,
          operator: '='
        };
    });

    return filters;
  }

  saveSearch(nameOfSearch) {
    if (isEmpty(nameOfSearch)) {
      this.sendError('search name can not be emtpy!');
      return ;
    }
    
    const filters = this.getCurrentFilters();

    this.queryService.saveSwapSearch(filters, nameOfSearch).then(result => {
      console.log('result', result);
      if (result.success) {
        this.sendSuccess('search result has been saved');
        this.refreshSavedSearch();
      }
    });
  }

  sendError(msg) {
    this._stroe.dispatch(recieveNotifications({
      type: 'error',
      text: `${msg}`
    }));
  }

  sendSuccess(msg) {
    this._stroe.dispatch(recieveNotifications({
      type: 'success',
      text: `${msg}`
    }));
  }

  showPopOver() {
    // should check if there is filters on the page
    const filters = this.getCurrentFilters(true);

    if (isEmpty(filters)) {
      this.sendError('filters can not be empty');
      return ;
    }

    for (const key in filters) {
      if (isEmpty(filters[key])) {
        this.sendError(`${key} can not be empty`);
        return ;
      }
    }

    this.popover.instance.show();
  }

  getFiltersBaseOnSavedSerch(savedSearchs: object) {
    const keys = Object.keys(savedSearchs);
    
    const filters = this.filters.filter(filter => {
      return keys.indexOf(filter.key) !== -1;
    });
    
    return filters;
  }
}
