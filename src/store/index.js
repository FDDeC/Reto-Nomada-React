// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension'
// import thunk from 'redux-thunk';
// import rootReducer from './../reducer/index';

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;
import { configureStore } from '@reduxjs/toolkit'
import whoIsSlice from '../slices/whoIs'

const store = configureStore({
  reducer: {
    whoIs:whoIsSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
})
export default store;