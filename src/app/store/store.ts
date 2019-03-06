import { Injectable } from '@angular/core';
import { DataMiddleware } from '../middlewares/data.middleware';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/index.reducer';
import { isEmpty } from 'lodash';

@Injectable()
export class Store {
  private _store: any;
  constructor(private dataMiddleware: DataMiddleware) {}

  appStore() {
    if (isEmpty(this._store)) {
      this._store = createStore(rootReducer, applyMiddleware(this.dataMiddleware.middleware));
    }

    return this._store;
  }
}
