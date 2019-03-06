import { 
  buildTraderFilter, 
  buildDateRangeFilter,
  buildStatusFilter, 
  builderFiltersBaseOnColumns
} from './queryBuilder';

describe('query builder', () => {
  it('build trader filter', () => {
    let traders = ['a'];
    let expectQuery = 'TraderInitials eq \'a\'';
    expect(buildTraderFilter(traders)).toBe(expectQuery);
    
    traders = ['a', 'b'];
    expectQuery = 'TraderInitials eq \'a\' or TraderInitials eq \'b\'';
    expect(buildTraderFilter(traders)).toBe(expectQuery);

    traders = ['a', 'b', 'c'];
    expectQuery = 'TraderInitials eq \'a\' or TraderInitials eq \'b\' or TraderInitials eq \'c\'';
    expect(buildTraderFilter(traders)).toBe(expectQuery);
  });

  it('buildDateRangeFilter', () => {
    let startDate = new Date(2012, 0, 1, 0, 0, 0);
    let endDate = new Date(2013, 0, 1, 23, 59, 59);
    
    let result = buildDateRangeFilter(startDate, endDate);
    let expectResult = '$filter=ReportDate ge 2012-01-01T00:00:00Z and ReportDate le 2013-01-01T23:59:59Z';
    
    expect(expectResult).toBe(result);

    startDate = new Date(2012, 0, 1, 0, 0, 0);
    endDate = new Date(2013, 2, 28, 23, 59, 59);
    
    result = buildDateRangeFilter(startDate, endDate);
    expectResult = '$filter=ReportDate ge 2012-01-01T00:00:00Z and ReportDate le 2013-03-28T23:59:59Z';
    
    expect(expectResult).toBe(result);
  });

  it('buildStatusFilter', () => {
    expect(buildStatusFilter(1, true)).toBe('StatusId eq 1');
    expect(buildStatusFilter(1, false)).toBe('StatusId ne 1');
    expect(buildStatusFilter(1, true, true)).toBe('$filter=StatusId eq 1');
    expect(buildStatusFilter(1, false, true)).toBe('$filter=StatusId ne 1');
  });

  it('builderFiltersBaseOnColumns', () => {
    const columnsValuesObj = {
      'col1': [1, 2],
      'col2': [1, 2],
      'col3': [1, 2],
    };

    const expectResult = '(col1 eq \'1\' or col1 eq \'2\') and (col2 eq \'1\' or col2 eq \'2\') and (col3 eq \'1\' or col3 eq \'2\')';
    expect(builderFiltersBaseOnColumns(columnsValuesObj)).toBe(expectResult);
  });
});
