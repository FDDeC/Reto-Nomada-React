import {
  LOG_REQUEST,
  START_REQUEST
} from './../action-types/index';

const initialState = {
  actorDetails: [],  
  logRequests: [],
  requesting:false
}

function rootReducer(state = initialState, action) {
  if (action.type === LOG_REQUEST) {
    return {
      ...state,
      logRequests: [...state.logRequests, action.payload.log],
      actorDetails: [action.payload.details],
      requesting:false
    };
  }  
  if (action.type === START_REQUEST) {
    return {
      ...state,
      requesting:true
    }
   }
  return { ...state }
}

export default rootReducer;