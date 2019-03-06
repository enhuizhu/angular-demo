import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ConfigService } from './config.service';
import { NotificationsService } from './notifications.service';

interface UserServiceInterface {
  getUserInfo();
}

@Injectable()
export class UserService implements UserServiceInterface {
  
  constructor(
    private httpService: HttpService, 
    private configService: ConfigService,
    private notificationService: NotificationsService
  ) {
  }

  getUserInfo() {
    return this.httpService.get(this.getUrl('username'));
  }

  getUrl(url) {
    return `${this.configService.entitlementsBaseUri}/api/${url}`; 
  }
}
