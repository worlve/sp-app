import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { END } from 'redux-saga';

import pageReducer from '../packages/page/state/reducer';
import pageSaga from '../packages/page/state/saga';

const rootReducer = combineReducers({
  page: pageReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,
];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(pageSaga);

export default store;