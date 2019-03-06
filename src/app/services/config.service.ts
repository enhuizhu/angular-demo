import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



interface Config {
  loadConfig(); 
}

@Injectable()
export class ConfigService implements Config {
  public entitlementsBaseUri: string;
  public odataBaseUri: string;
  public apiBaseUrl: string;
  public socketUrl: string;
  public gmexUrl: string;
  public queryUrl: string;
  
  constructor() { }
  
  loadConfig(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.odataBaseUri = environment.uri.odata;
      this.entitlementsBaseUri = environment.uri.entitlements;
      this.apiBaseUrl = environment.uri.testApi;
      this.gmexUrl = environment.uri.gmexApi;
      this.socketUrl = environment.uri.socketUrl;
      this.queryUrl = environment.uri.query;
      resolve();
    });
  }
}
