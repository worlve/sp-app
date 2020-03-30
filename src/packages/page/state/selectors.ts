import { createSelector } from 'reselect';
import { PageFactory } from '../services/PageFactory';
import { PageError } from '../entities/PageError';
import { SelectedPagePart } from '../entities/SelectedPagePart';

const getPage = (state: any) =>
  state.page.entities.page;

const getPageError = (state: any) =>
  state.page.ui.pageError;

const getPageLoading = (state: any) =>
  state.page.ui.pageLoading;

const getSelectedPagePart = (state: any) =>
  state.page.ui.selectedPagePart;

export const makeGetPage = () => {
  return createSelector(
    [ getPage ],
    (pageData?: any) => {
      if (!pageData) {
        return undefined;
      }
      return PageFactory.buildPage(pageData);
    }
  );
};

export const makeGetPageError = () => {
  return createSelector(
    [ getPageError ],
    (pageError?: PageError) => {
      if (!pageError || !pageError.type) {
        return undefined;
      }
      return pageError;
    }
  );
};

export const makeGetPageLoading = () => {
  return createSelector(
    [ getPageLoading ],
    (pageLoading?: boolean) => {
      return !!pageLoading;
    }
  );
};

export const makeGetSelectedPagePart = () => {
  return createSelector(
    [ getSelectedPagePart ],
    (selectedPagePart?: SelectedPagePart) => {
      if (!selectedPagePart) {
        return undefined;
      }
      return selectedPagePart;
    }
  );
};