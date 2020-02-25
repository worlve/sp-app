import ReduxAction, { Action } from '../../../utils/ReduxAction';
import { Page } from '../entities/Page';
import { SelectedPagePart } from '../entities/SelectedPagePart';
import { PageErrorType } from '../entities/PageError';

const ra = new ReduxAction('PAGE');

export const SET_PAGE = ra.actionType('SET_PAGE');

export interface SetPageAction extends Action {
  page?: any;
}

export const setPage = (page?: Page):SetPageAction => {
  if (!page) {
    return {
      type: SET_PAGE,
    };
  }
  const pageData = page.json();
  return {
    type: SET_PAGE,
    page: pageData,
  };
};

export const SET_PAGE_LOADING = ra.actionType('SET_PAGE_LOADING');

export interface SetPageLoadingAction extends Action {
  loading: boolean;
}

export const setPageLoading = (loading: boolean):SetPageLoadingAction => {
  return {
    type: SET_PAGE_LOADING,
    loading,
  };
};

export const SET_PAGE_ERROR = ra.actionType('SET_PAGE_ERROR');

export interface PageErrorAction extends Action {
  pageErrorType?: PageErrorType;
}

export const setPageError = (pageErrorType?: PageErrorType):PageErrorAction => {
  return {
    type: SET_PAGE_ERROR,
    pageErrorType,
  };
};

export const SET_SELECTED_PAGE_PART = ra.actionType('SET_SELECTED_PAGE_PART');

export interface SelectedPagePartAction extends Action {
  selectedPagePart?: SelectedPagePart;
}

export const setSelectedPagePart = (selectedPagePart?: SelectedPagePart):SelectedPagePartAction => {
  return {
    type: SET_SELECTED_PAGE_PART,
    selectedPagePart,
  };
};