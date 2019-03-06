import {
  QUERY_FILTERS_CHANGE
} from '../actions/query.action';

const defautState = {
  filters: {},
};

export default (state = defautState, action) => {
  switch (action.type) {
    case QUERY_FILTERS_CHANGE:
      return Object.assign({}, state, {filters: action.payload});
    default:
      return state;
  }
};
