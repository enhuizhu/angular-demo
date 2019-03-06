import { 
  RECIEVEED_UPCOMING_DATA,
  RECIEVE_UPCOMING_DATA_DEFINITION 
} from '../actions/reportUpcomingData.action';

export default (state = {data: [], dataDefinitions: {}}, action) => {
  switch (action.type) {
    case RECIEVEED_UPCOMING_DATA:
      return Object.assign({}, state, {data: action.payload});
    case RECIEVE_UPCOMING_DATA_DEFINITION:
      return Object.assign({}, state, {dataDefinitions: action.payload});
    default:
      return state;
  }
};
