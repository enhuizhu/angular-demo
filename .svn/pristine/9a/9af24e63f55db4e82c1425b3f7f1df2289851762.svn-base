import { Injectable } from '@angular/core';
import { GET_USERINFO, recieveUserInfo } from '../actions/userinfo.action';
import { 
  GET_UPCOMING_DATA_DEFINITION,
  getUpcomingDataDefinition,
  GET_UPCOMING_DATA,
  getUpcomingData,
  recieveUpcomingDataDefinition, 
  recieveUpcomingData,
  showUpcomingDataLoader,
  hideUpcomingDataLoader,
} from '../actions/reportUpcomingData.action';
import { GMEX_GET_STATUS, reciveGmexStatus } from '../actions/gmex.action';
import { recieveNotifications } from '../actions/notifications.action';
import { UserService } from '../services/user.service';
import { OdataService } from '../services/odata.service';
import { GmexService } from '../modules/gmex/services/gmex.service';
import { isEmpty } from 'lodash';

@Injectable()
export class DataMiddleware {
  constructor(
    private userService: UserService,
    private odataService: OdataService,
    private gmexService: GmexService,
  ) {
  }

  middleware = store => next => action => {
    switch (action.type) {
      case GET_USERINFO:
        this.userService.getUserInfo().then(response => {
          store.dispatch(recieveUserInfo(response));
        });

        break;
      
      case GMEX_GET_STATUS:
        this.gmexService.getStatus().then(status => {
          const tempestStatusMap = {};
          
          status.value.map(statu => {
            tempestStatusMap[statu.Name] = statu;
          });

          store.dispatch(reciveGmexStatus(tempestStatusMap));
        }).catch(e => {
          store.dispatch(recieveNotifications({
            type: 'error',
            text: 'failed fetch status data'
          }));
        });
        break;

      case GET_UPCOMING_DATA_DEFINITION:
        store.dispatch(showUpcomingDataLoader());  
      
        this.odataService.getUpcomingDataDefinitions().then(response => {
          store.dispatch(recieveUpcomingDataDefinition(response));
          // should get the upcoming data now
          store.dispatch(getUpcomingData());
        });
        break;
      
      case GET_UPCOMING_DATA:
        // should check if the store already have user infomation
        const state = store.getState();
        
        if (isEmpty(state.userInfo)) {
          // try it agin after 0.2 second
          setTimeout(() => {
            store.dispatch(getUpcomingData());
          }, 200);
          return false;
        }
        
        // already have user info
        this.odataService.getUpcoming(state.userInfo.userInitials).then(response => {
          store.dispatch(hideUpcomingDataLoader());
          store.dispatch(recieveUpcomingData(response));
        });
        
        break;
      default:
        break;
    }

    /*
    * Pass all actions through by default
    */
    return next(action);
  }
}
