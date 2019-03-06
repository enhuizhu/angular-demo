import { TestBed, inject } from '@angular/core/testing';

import { TradeService } from './trade.service';

import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

describe('TradeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TradeService,
        ConfigService,
        HttpService
      ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([TradeService], (service: TradeService) => {
    expect(service).toBeTruthy();
  }));
});
