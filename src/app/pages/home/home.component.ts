declare var require: any;
declare var jQuery: any;

import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../../services/contracts.service';
import { InvoiceService } from '../../services/invoice.service';
import { TradeService } from '../../services/trade.service';
import { SettingService } from '../../services/setting.service';
import { Store } from '../../store/store';
import { recieveNotifications } from '../../actions/notifications.action';
import Page from '../../core/page';

const moment = require('moment');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Page implements AfterViewInit, OnDestroy, OnInit {
  public winConfig;
  public gmexWinConfig;
  public tabTitles;
  public buyPieData = [];
  public sellPieData = [];
  public invoiceData = [];
  public tradeData = [];
  public tradeChartData = [];
  public isLoadingSaleContract = true;
  public isLoadingBuyContract = true;
  public isLoadingInvoices = true;
  public isLoadingTrades = true;
  public isLoadingTradeChart = true;
  public orders = null;

  private _store;

  constructor(
    private contractService: ContractsService,
    private invoiceService: InvoiceService,
    private tradeService: TradeService,
    private settingService: SettingService,
    store: Store,
    route: ActivatedRoute,
    private el: ElementRef
  ) {

    super(store.appStore(), route);
    this._store = store.appStore();

    this.winConfig = {
      width: 400,
      height: 500,
    };

    this.gmexWinConfig = {
      width: 1024,
      height: 800
    };

    this.tabTitles = [
      {
        title: 'Daily',
        active: true,
      },
      {
        title: 'Month End',
        active: false,
      },
      {
        title: 'Year End',
        active: false,
      },
    ];

    this.enableWidgetSort = this.enableWidgetSort.bind(this);
    this.disableWidgetSort = this.disableWidgetSort.bind(this);
    this.onSortUpdate = this.onSortUpdate.bind(this);
  }

  ngOnInit() {
    this.settingService.getOrders().then(orders => {
      console.log('widget orders', orders);
      this.orders = orders;

      setTimeout(() => {
        this.initSort();
        this.setupListener();
      }, 100);
    });
  }

  ngAfterViewInit() {
    this.loadSaleContracts();
    this.loadBuyContracts();
    this.loadInvoices();
    this.loadTrades();
    this.loadChartData();
  }

  ngOnDestroy() {
    if (typeof jQuery === 'undefined') {
      return ;
    } 
    
    jQuery(this.el.nativeElement).find('app-widget .icon-move').off('mousedown', this.enableWidgetSort);
    jQuery(document).off('mouseup', this.disableWidgetSort);
  }

  setupListener() {
    if (typeof jQuery === 'undefined') {
      return ;
    } 

    jQuery(this.el.nativeElement).find('app-widget .icon-move').on('mousedown', this.enableWidgetSort);
    jQuery(document).on('mouseup', this.disableWidgetSort);
  }

  initSort() {
    if (typeof jQuery === 'undefined') {
      return ;
    } 
    
    jQuery(this.el.nativeElement).find('.widgets').sortable({
      update: this.onSortUpdate,
    });
    
    setTimeout(this.disableWidgetSort, 100);
  }

  onSortUpdate(event, ui) {
    if (typeof jQuery === 'undefined') {
      return ;
    } 
    
    const orders = jQuery(this.el.nativeElement).find('.widgets').sortable('toArray');
    this.settingService.saveOrders(orders);
  }

  enableWidgetSort() {
    jQuery(this.el.nativeElement).find('.widgets').sortable('enable');
  }

  disableWidgetSort() {
    try {
      jQuery(this.el.nativeElement).find('.widgets').sortable('disable');
    } catch (e) {
      console.log('catch error when disable', e);
    }
  }

  loadSaleContracts() {
    this.isLoadingTrades = true;
    
    this.contractService.getSaleContracts().then(results => {
      this.sellPieData = this.formatData(results, 'sell');
      this.isLoadingSaleContract = false;
    }).catch((error) => {
      this.isLoadingSaleContract = false;
      this._store.dispatch(recieveNotifications({
        type: 'error', 
        text: 'There is error when fetching sale contracts data.'
      }));
    });
  }

  loadBuyContracts() {
    this.isLoadingBuyContract = true;
    
    this.contractService.getBuyContracts().then((results) => {
      this.buyPieData = this.formatData(results, 'buy');
      this.isLoadingBuyContract = false;
    }).catch((error) => {
      this.isLoadingBuyContract = false;
      this._store.dispatch(recieveNotifications({
        type: 'error', 
        text: 'There is error when fetching buy contracts data.'
      }));
    });
  }

  loadInvoices() {
    this.isLoadingInvoices = true;
    
    this.invoiceService.getAllInvoices().then(invoices => {
      this.invoiceData = invoices;
      this.isLoadingInvoices = false;
    }).catch((error) => {
      this.isLoadingInvoices = false;
      this._store.dispatch(recieveNotifications({
        type: 'error', 
        text: 'There is error when fetching invoices data.'
      }));
    });
  }

  loadTrades() {
    this.isLoadingTrades = true;
    
    this.tradeService.getTodayTrade().then(trades => {
      this.tradeData = trades;
      this.isLoadingTrades = false;
    }).catch((error) => {
      this.isLoadingTrades = false;
      this._store.dispatch(recieveNotifications({
        type: 'error', 
        text: 'There is error when fetching trade data.'
      }));
    });
  }

  loadChartData() {
    this.isLoadingTradeChart = true;
    
    this.tradeService.getTradeChart().then(data => {
      this.isLoadingTradeChart = false;
      const lineData = data.map(d => {
        return {
          date: moment(d.date),
          value: d.count,
        };
      });

      this.tradeChartData = [{
        groupName: 'Trade',
        data: lineData
      }];
    }).catch(error => {
      this.isLoadingTradeChart = false;
      this._store.dispatch(recieveNotifications({
        type: 'error',
        text: 'There is error when fetching trade chart data',
      }));
    });
  }

  formatData(datas, key) {
    return datas.map(data => {
      return {
        name: data.DataGroup,
        value: data[key]
      };
    });
  }

  onTabSwitch(tabIndex) {
    console.log('switch to', this.tabTitles[tabIndex]);
  }

  sendInvoice(info) {
    info.data.isLoading = true;

    this.invoiceService.sendInvoice(info.data.id).then(response => {
      info.data.isLoading = false;
      this._store.dispatch(recieveNotifications({
        type: 'success',
        text: `invoice of ${info.data.CounterpartyName} has been sent successfully!`,
      }));
    });
  }
}
