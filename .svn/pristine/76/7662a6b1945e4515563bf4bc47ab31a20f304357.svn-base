import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { Store } from '../store/store';
import { buildTraderFilter } from '../helpers/queryBuilder';
import { isEmpty } from 'lodash';

interface OdataInterface {
  getWatchList(): void;
  getUpcoming(userInitials: string): void;
  getCompeleted(): void;
}

@Injectable()
export class OdataService implements OdataInterface {
  private _store: any;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) { 
  }

  getWatchList() {
  }

  getUpcoming(userInitials) {
    const userInitials_dev = 'DOH';

    return  this.httpService.get(
      this.getUrl('externalFutureTrades?$filter=('
      + buildTraderFilter([userInitials_dev]) 
      + ')'), true);
  }

  getUpcomingDataDefinitions() {
    return this.httpService.get('assets/upcomingDataDefinitions.json', true);
  }

  getCompeleted() {

  }

  getUrl(url) {
    return `${this.configService.odataBaseUri}/odata/${url}`;
  }
}
