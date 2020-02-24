import { put, all, takeLatest } from 'redux-saga/effects'; // eslint-disable-line import/extensions
import * as Actions from './actions.js';
import { Page } from '../entities/Page.js';

function* _getPage(action: any) {
  yield put(Actions.getPage.success(new Page(action.pageId, 'test')));
}

export default function* saga() {
  yield all([
    takeLatest(Actions.GET_PAGE.REQUEST, _getPage),
  ]);
}
