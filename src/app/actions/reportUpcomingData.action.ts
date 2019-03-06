export const RECIEVEED_UPCOMING_DATA = 'RECIEVEED_UPCOMING_DATA';
export const GET_UPCOMING_DATA = 'GET_UPCOMING_DATA';
export const GET_UPCOMING_DATA_DEFINITION = 'GET_UPCOMING_DATA_DEFINITION';
export const RECIEVE_UPCOMING_DATA_DEFINITION = 'RECIEVE_UPCOMING_DATA_DEFINITION';
export const LOADING_UPCOMING = 'LOADING_UPCOMING';
export const UPCOMING_DATA_RESOLVED = 'UPCOMING_DATA_RESOLVED';

export const showUpcomingDataLoader = () => {
  return {
    type: LOADING_UPCOMING,
  };
};

export const hideUpcomingDataLoader = () => {
  return {
    type: UPCOMING_DATA_RESOLVED
  };
};

export const recieveUpcomingData = (payload) => {
  return {
    type: RECIEVEED_UPCOMING_DATA,
    payload,
  };
};

export const getUpcomingData = () => {
  return {
    type: GET_UPCOMING_DATA,
  };
};

export const getUpcomingDataDefinition = () => {
  return {
    type: GET_UPCOMING_DATA_DEFINITION,
  };
};

export const recieveUpcomingDataDefinition = (payload) => {
  return {
    type: RECIEVE_UPCOMING_DATA_DEFINITION,
    payload,
  };
};
