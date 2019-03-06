import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

interface TradeServiceInterface {
  getTodayTrade();
}

@Injectable()
export class TradeService implements TradeServiceInterface {

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) { 
    
  }

  getTodayTrade() {
    return this.httpService.get(this.getUrl('all'));
  }

  getTradeChart() {
    return this.httpService.get(this.getUrl('chart'));
  }

  getUrl(url) {
    return `${this.configService.apiBaseUrl}/trade/${url}`;
  }
}
