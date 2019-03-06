import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './user.service';
import { HttpService } from './http.service';
import { ConfigService } from './config.service';
import { NotificationsService } from './notifications.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        HttpService,
        ConfigService,
        NotificationsService,
      ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
