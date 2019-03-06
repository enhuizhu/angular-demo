import { TestBed, inject } from '@angular/core/testing';

import { ContractsService } from './contracts.service';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';


describe('ContractsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContractsService,
        ConfigService,
        HttpService
      ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([ContractsService], (service: ContractsService) => {
    expect(service).toBeTruthy();
  }));
});
