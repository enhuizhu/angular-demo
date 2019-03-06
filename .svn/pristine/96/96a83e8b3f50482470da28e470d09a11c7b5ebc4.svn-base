import { 
  GMEX_RECIEVE_STATUS,
  GMEX_DATE_RANGE_CHANGE,
  GMEX_LOADED_CHANGE,
  GMEX_REFRESH_DATA,
} from '../actions/gmex.action';

const now = new Date();
const startDate = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate(), 0, 0, 0);
const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

const defaultState = {
  tempestStatusMap: {
    Pending: {},
    Success: {},
    Fail: {},
    New: {}
  },

  dateRange: {
    start: startDate,
    end: endDate
  },
  
  loaded: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GMEX_RECIEVE_STATUS:
      return Object.assign({}, state, {tempestStatusMap: action.payload});
    case GMEX_DATE_RANGE_CHANGE:
      return Object.assign({}, state, {dateRange: action.payload});
    case GMEX_LOADED_CHANGE:
      return Object.assign({}, state, {loaded: action.payload});
    case GMEX_REFRESH_DATA:
      return Object.assign({}, state);
    default:
      return state;
  }
};
