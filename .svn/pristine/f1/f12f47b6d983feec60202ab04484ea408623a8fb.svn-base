import { Injectable } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { HttpService } from '../../../services/http.service';


@Injectable()
export class QueryService {

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) { 
  }

  getStrategies() {
    return this.httpService.get(this.getUrl('strategies'), true);
  }

  getStrategiesStartWith(start: string) {
    return this.httpService.get(this.getUrl(`strategiesStartWith?start=${start}`), true);
  }

  getTradeNumberStartWith(start: string) {
    return this.httpService.get(this.getUrl(`tradeNumberStartWith?start=${start}`), true);
  }

  getTradersStartWith(start: string) {
    return this.httpService.get(this.getUrl(`traderStartWith?start=${start}`), true);
  }

  getTraders() {
    return this.httpService.get(this.getUrl('traders'), true);
  }

  getCompanyStartWith(start: string) {
    return this.httpService.get(this.getUrl(`companyStartWith?start=${start}`), true);
  }

  getInternalCompanies() {
    return this.httpService.get(this.getUrl('internalCompanies'), true);
  }

  getTradesBaseOnStrategies(strategies = []) {
    return this.httpService.get(this.getUrl(`tradeData?strategies=${strategies.join(',')}`));
  }

  getTradesBaseOnFilters(filterStr) {
    return this.httpService.get(this.getUrl(`tradeData?filter=${filterStr}`));
  }

  getSwapDataDefinitions() {
    return this.httpService.get('assets/swapDataDefinitions.json'); 
  }

  getSwapSavedSearch() {
    return this.httpService.get(this.getUrl('getSwapSavedSearch'));
  }

  saveSwapSearch(filters, nameOfSearch) {
    return this.httpService.post(this.getUrl(`saveSwapSearch?name=${nameOfSearch}`), filters);
  }

  getUrl(url) {
    return `${this.configService.queryUrl}/${url}`;
  }
}
