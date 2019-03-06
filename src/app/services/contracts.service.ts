import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

interface ContractsServiceInterface {
  getBuyContracts();
  getSaleContracts();
}

@Injectable()
export class ContractsService implements ContractsServiceInterface {

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) { }

  getBuyContracts() {
    return this.httpService.get(this.getUrl('buy'));
  }

  getSaleContracts() {
    return this.httpService.get(this.getUrl('sell'));
  }

  getUrl(url) {
    return `${this.configService.apiBaseUrl}/contracts/${url}`;
  }
}
