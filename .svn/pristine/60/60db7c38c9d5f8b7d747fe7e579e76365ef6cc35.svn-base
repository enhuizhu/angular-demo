import {
  LOADING_UPCOMING, 
  UPCOMING_DATA_RESOLVED
} from '../actions/reportUpcomingData.action';

export default (state = false, action) => {
  switch (action.type) {
    case LOADING_UPCOMING:
      return true;
    case UPCOMING_DATA_RESOLVED:
      return false;
    default:
      return state;
  }
};
