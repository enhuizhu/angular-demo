import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { isEmpty } from 'lodash';



interface HttpInterface {
  get(url: string): Promise<any>;
  post(url: string, data: any): Promise<any>;
  put(url: string, data: any): Promise<any>;
}

@Injectable()
export class HttpService implements HttpInterface {
  private _cache  = {};
  
  constructor(private http: HttpClient) { 
  }

  getFromCache(key) {
    return new Promise((resolve, reject) => {
      if (this._cache[key]) {
        resolve(this._cache[key]);
      } else {
        this.send(key, 'get').then(response => {
          this._cache[key] = response;
          resolve(response);
        }).catch(reject);
      }
    });
  }

  get(url: string, cache: boolean = false): Promise<any> {
    if (cache) {
      return this.getFromCache(url);
    }
    
    return this.send(url, 'get');
  }

  post(url: string, data: any): Promise<any> {
    return this.send(url, 'post', data);
  }

  put(url: string, data: any): Promise<any> { 
    return this.send(url, 'put', data);
  }

  patch(url: string, data: any): Promise<any> { 
    return this.send(url, 'patch', data);
  }

  send(url: string, method: string, data?: any, options?: any): Promise<any> {
    const parmas: any[] = [];
    const optionObj = {
      withCredentials: true,
    };

    parmas.push(url);

    if (!isEmpty(data)) {
      parmas.push(data);
    }

    if (!isEmpty(options)) {
      Object.assign(optionObj, options);
    }
    
    parmas.push(new RequestOptions(optionObj));
    
    return this.http[method](...parmas)
     .pipe(
        map((res: any) =>  res),
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }

  handleErrorObservable(err: any) {
    console.error(err);
    return Promise.reject(err.message || err);
  }
}
