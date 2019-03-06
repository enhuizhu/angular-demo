declare var require: any;

import { each, isEmpty } from 'lodash';

const moment = require('moment');

export function buildTraderFilter(traders) {
  return this.buildFilterBaseOnColumn('TraderInitials', traders);
}

export function buildDateRangeFilter(startDate, endDate) {
  return `$filter=${buildRangeFilter('ReportDate', moment(startDate).utc().format(), moment(endDate).utc().format())}`;
}

export function buildStatusFilter(successStatus: number, loaded: boolean, withFilterStr?: boolean) {
  let filterStr = '';

  if (withFilterStr) {
    filterStr += '$filter=';
  }

  const operator = loaded ? 'eq' : 'ne';
  filterStr += `StatusId ${operator} ${successStatus}`;

  return filterStr;
}

export function buildFilterBaseOnColumn(columnName: string, values: string[] = [], operator: string = 'eq') {
  let queryStr = '';
  
  values.forEach((value, i) => {
    if (i !== 0 && i < values.length) {
      queryStr += ' or ';
    }

    queryStr += `${columnName} ${operator} \'${value}\'`;
  });
  
  return queryStr;
}

export function buildRangeFilter(columnName, minValue, maxValue) {
  return `${columnName} ge ${minValue} and ReportDate le ${maxValue}`;
}

export function builderFiltersBaseOnColumns(columnsValuesObj, logic = 'and') {
  let queryStr = '';
  let index = 0;

  each(columnsValuesObj, (values, columnName) => {
    if (isEmpty(values)) {
      return ;
    }

    if (index !== 0) {
      queryStr += ` ${logic} `;
    }

    queryStr += `(${buildFilterBaseOnColumn(columnName, values)})`;
    index++;
  });

  return queryStr;
}
