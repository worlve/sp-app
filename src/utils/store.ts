import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import pageReducer from '../packages/page/state/reducer';

const rootReducer = combineReducers({
  page: pageReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools()
);

export default store;