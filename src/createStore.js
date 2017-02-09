import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { app } from './containers'

const middleware = applyMiddleware(thunk);

export default (data = {}) => {
  const rootReducer = combineReducers({
    //모든 리듀서 선언
    [app.NAME]: app.reducer,
  })
  

  return createStore(rootReducer, data, middleware)
}
