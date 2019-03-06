import { TestBed, inject } from '@angular/core/testing';

import { SettingService } from './setting.service';

describe('SettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingService]
    });
  });

  it('should be created', inject([SettingService], (service: SettingService) => {
    expect(service).toBeTruthy();
  }));

  it('getOrders', 
    inject([SettingService], (service: SettingService) => {
      service.getOrders().then(orders => {
        expect(orders).toEqual(['contracts', 'invoice', 'trade-data', 'trade-chart']);
      });
    })
  );

  it('saveOrders', inject([SettingService], (service: SettingService) => {
    service.saveOrders(['contracts', 'invoice', 'trade-data', 'trade-chart']).then((response: any) => {
      expect(response.success).toBeTruthy();
    });
  }));
});
