import {
  LOG_REQUEST,
  START_REQUEST
} from './../action-types/index';

const whoIsApi = process.env.REACT_APP_API_WHOIS_URL

export function logRequest(data) {
  return function (dispatch) {
    return dispatch({type:LOG_REQUEST, payload:data})   
  };
}

export function startRequest() {
  return function (dispatch) {    
      return dispatch({type:START_REQUEST, payload:null})    
  };
}