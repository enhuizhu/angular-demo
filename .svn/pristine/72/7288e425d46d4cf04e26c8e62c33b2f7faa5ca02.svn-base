import { ViewChild, OnInit, OnChanges } from '@angular/core';
import { QueryService } from '../services/query.service';

export class Autocompelete implements OnInit {
  private _timer = null;
  public items = [];
  public isLoading = false;
  public startStr = '';
  public startNumber = '';
  public loaderSize = 20;
  public delay: any;
  public value: string[];
  public key: string;
  public searchExpr: string[];
  public selectedItems: any[];

  protected dataServiceName = 'getStrategiesStartWith';
  protected getAllRecord;

  @ViewChild('autoCompelete') autocompelteComponent: any;

  constructor(
    private queryService: QueryService
  ) {

  }

  ngOnInit() {
    if (this.getAllRecord) {
      this.queryService[this.dataServiceName]().then(results => {
        this.items = results;
      });
    }
  }

  onInput(e) {
    this.startStr = e.event.target.value;
    
    if (this.getAllRecord) {
      return ;
    }

    this.showSearchResult(this.startStr);
  }

  clear() {
    this.startStr = '';
    // this.strategies = [];
  }

  getStart(value: string) {
    const valueStart = value.substr(0, this.startStr.length);

    if (this.startStr === valueStart) {
      return this.startStr;
    }

    return '';
  }

  setItemsAndValues(values: string[]) {
    this.value = values;
    this.selectedItems = values;
    this.items = [];
    
    values.map(v => {
      const obj = {};
      
      this.searchExpr.forEach(key => {
        obj[key] = v;
      });
      
      this.items.push(obj);
    });
  }

  showSearchResult(startWith: any) {
    this.isLoading = true;
    this.autocompelteComponent.instance.open();
    
    if (this._timer) {
      clearTimeout(this._timer);
    }
    
    this._timer = setTimeout(() => {
      this.queryService[this.dataServiceName](startWith).then(results => {
        this.items = results;
        this.isLoading = false;
        this.autocompelteComponent.instance.open();
      });
    }, this.delay);
  }
}
