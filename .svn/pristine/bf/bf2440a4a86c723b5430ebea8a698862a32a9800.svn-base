import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OdataService } from './odata.service';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { NotificationsService } from './notifications.service';


describe('OdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        OdataService, 
        ConfigService, 
        HttpService, 
        NotificationsService,
      ]
    });
  });

  it('should be created', inject([OdataService], (service: OdataService) => {
    expect(service).toBeTruthy();
  }));
});
