import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataMiddleware } from '../middlewares/data.middleware';
import { UserService } from '../services/user.service';
import { HttpService } from '../services/http.service';
import { ConfigService } from '../services/config.service';
import { OdataService } from '../services/odata.service';
import { GmexService } from '../modules/gmex/services/gmex.service';
import { NotificationsService } from '../services/notifications.service';
import { Store } from './store';
import { recieveUserInfo } from '../actions/userinfo.action';
import { recievePageTitle } from '../actions/pageTitle.action';
import { 
  recieveUpcomingDataDefinition, 
  recieveUpcomingData,
  showUpcomingDataLoader,
  hideUpcomingDataLoader 
} from '../actions/reportUpcomingData.action';

import { recieveNotifications } from '../actions/notifications.action';

import {
  reciveGmexStatus,
  changeGmexDateRange,
  changeGmexLoaded
} from '../actions/gmex.action';

import {
  changeQueryFilters
} from '../actions/query.action';

describe('data middleware', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ 
        Store, 
        DataMiddleware, 
        UserService, 
        HttpService, 
        ConfigService,
        OdataService,
        NotificationsService,
        GmexService
      ]
    });
  });

  it('test store userinfo', inject([Store], (store: Store) => {
    const appStore = store.appStore();
    let state = appStore.getState();
    expect(state.userInfo).toEqual({});
    
    appStore.dispatch(recieveUserInfo({'name': 'test'}));
    state = appStore.getState();
    expect(state.userInfo).toEqual({'name': 'test'});
  }));

  it('test store page title', inject([Store], (store: Store) => {
    const appStore = store.appStore();
    let state = appStore.getState();
    expect(state.pageTitle).toEqual('');
    
    appStore.dispatch(recievePageTitle('test title'));
    state = appStore.getState();
    expect(state.pageTitle).toEqual('test title');
  }));

  it('test the definition data of upcoming data', inject([Store], (store: Store) => {
    const appStore = store.appStore();
    let state = appStore.getState();
    expect(state.upcomingData).toEqual({data: [], dataDefinitions: {}});
    
    appStore.dispatch(recieveUpcomingDataDefinition({
      'test' : {
        name: 'test'
      }
    }));

    state = appStore.getState();
    
    expect(state.upcomingData.data).toEqual([]);

    appStore.dispatch(recieveUpcomingData([
      {test: 1},
      {test: 2}
    ]));

    state = appStore.getState();
    
    expect(state.upcomingData.data).toEqual([
      {test: 1},
      {test: 2}
    ]);
  }));

  it('test the loader of upcoming data', inject([Store], (store: Store) => {
    const appStore = store.appStore();
    let state = appStore.getState();
    expect(state.upcomingDataLoader).toBeFalsy();
    
    appStore.dispatch(showUpcomingDataLoader());
    state = appStore.getState();
    expect(state.upcomingDataLoader).toBeTruthy();

    appStore.dispatch(hideUpcomingDataLoader());
    state = appStore.getState();
    expect(state.upcomingDataLoader).toBeFalsy();
  }));

  it('test reducer of notifications', inject([Store], (store: Store) => {
    const appStore = store.appStore();
    let state = appStore.getState();
    console.log('initial notifications', state.notifications);
    expect(state.notifications.length).toBe(0);

    appStore.dispatch(recieveNotifications({type: 'error', text: 'error'}));
    state = appStore.getState();
    expect(state.notifications.length).toBe(1);
  }));


  it('test reducer of gmex', inject([Store], (store: Store) => {
    const appStore = store.appStore();
    let state = appStore.getState();
    
    const tempestStatus = {
      'Pending': {
        'Id': 2,
        'Name': 'Pending',
        'Description': 'Loading to Tempest'
      },
      'Success': {
        'Id': 4,
        'Name': 'Success',
        'Description': 'Successfully loaded into Tempest'
      },
      'Fail': {
        'Id': 3,
        'Name': 'Fail',
        'Description': 'Failed loading to Tempest'
      },
      'New': {
        'Id': 1,
        'Name': 'New',
        'Description': 'Newly inserted record'
      }
    };

    expect(typeof state.gmex.tempestStatusMap).toBe('object');
    expect(typeof state.gmex.dateRange.start).toBe('object');
    expect(typeof state.gmex.dateRange.end).toBe('object');
    expect(state.gmex.loaded).toBeNull();

    appStore.dispatch(reciveGmexStatus(tempestStatus));
    state = appStore.getState();

    expect(state.gmex.tempestStatusMap.New.Id).toBe(1);
    expect(state.gmex.tempestStatusMap.Fail.Id).toBe(3);

    appStore.dispatch(changeGmexDateRange({start: new Date(2011, 0, 1), end: new Date(2012, 0, 1)}));
    state = appStore.getState();
    
    expect(state.gmex.dateRange.start.getFullYear()).toBe(2011);
    expect(state.gmex.dateRange.end.getFullYear()).toBe(2012);

    appStore.dispatch(changeGmexLoaded(true));
    state = appStore.getState();
    expect(state.gmex.loaded).toBeTruthy();
    
    appStore.dispatch(changeGmexLoaded(false));
    state = appStore.getState();
    expect(state.gmex.loaded).toBeFalsy();
  }));

  it('test reducer of query', inject([Store], (store: Store) =>  {
    const appStore = store.appStore();
    let state = appStore.getState();

    expect(state.query.filters).toEqual({});

    appStore.dispatch(changeQueryFilters({test: [1]}));
    state = appStore.getState();
    expect(state.query.filters).toEqual( {test: [1]});
  }));
});
