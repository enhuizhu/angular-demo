declare var require: any;

import { Injectable } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { HttpService } from '../../../services/http.service';
import { buildDateRangeFilter, buildStatusFilter } from '../../../helpers/queryBuilder';

const moment = require('moment');

@Injectable()
export class GmexService {

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) { 
  }

  getDataTMinusTwo(startDate, endDate, loaded = null, successStatus = 2) {
    let url = `LiftingsFeed?${buildDateRangeFilter(startDate, endDate)}`;

    if (loaded !== null) {
      url = `${url} and ${buildStatusFilter(successStatus, loaded)}`;
    }

    return this.httpService.get(this.getUrl(url));
  }

  loadToTempest(id, data) {
    let postData = {};

    if (data) {
      postData = data;
    }
    return this.httpService.patch(this.getUrl(`LiftingsFeed(${id})`), postData);
  }

  getStatus() {
    return this.httpService.get(this.getUrl('Status'));
  }

  getTMinusTwoRecordById(id) {
    return this.httpService.get(this.getUrl(`LiftingsFeed(${id})`));
  }

  getTMinusTwoDataDefinition() {
    return this.httpService.get('assets/tMinusTwoDataDefinitions.json', true);
  }

  getTMinusOneDataDefinition() {
    return this.httpService.get('assets/tMinusOneDataDefinitions.json', true);
  }

  updateCellData(id, cellData) {
    return this.httpService.patch(this.getUrl(`LiftingsFeed(${id})`), cellData);
  }

  testUpdateCellData(cellData) {
    return this.httpService.post(`${this.configService.apiBaseUrl}/gmax/updateCell`, cellData);
  }

  public getUrl(url) {
    return `${this.configService.gmexUrl}/${url}`;
    // return `${this.configService.apiBaseUrl}/gmax/${url}`;
  }
}
