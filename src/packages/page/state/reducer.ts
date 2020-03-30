import * as Actions from './actions';
import { Page } from '../entities/Page';
import { Action } from '../../../utils/ReduxAction';
import { PageError } from '../entities/PageError';
import { SelectedPagePart } from '../entities/SelectedPagePart';

export interface PageStateEntities {
  page?: Page;
}

export interface PageStateUi {
  loading: boolean;
  pageError?: PageError;
  selectedPagePart?: SelectedPagePart;
}

export interface PageState {
  ui: PageStateUi;
  entities: PageStateEntities;
};

const initialState:PageState = {
  entities: {
    page: undefined,
  },
  ui: {
    loading: false,
  },
};

const pageReducer = (state = initialState, action: Action): PageState => {
  let newState = state;
  switch(action.type) {
    case Actions.SET_PAGE:
      return State.setPage(newState, action as Actions.SetPageAction);
    case Actions.SET_PAGE_LOADING:
      return State.setPageLoading(newState, action as Actions.SetPageLoadingAction);
    case Actions.SET_PAGE_ERROR:
      return State.setPageError(newState, action as Actions.PageErrorAction);
    case Actions.SET_SELECTED_PAGE_PART:
      return State.setSelectedPagePart(newState, action as Actions.SelectedPagePartAction);
    default:
      return state;
  }
}

class State {
  static setPage(state: PageState, action: Actions.SetPageAction): PageState {
    return {
      ...state,
      entities: {
        ...state.entities,
        page: action.page,
      },
    };
  }

  static setPageLoading(state: PageState, action: Actions.SetPageLoadingAction): PageState {
    return {
      ...state,
      ui: {
        ...state.ui,
        loading: action.loading,
      },
    };
  }

  static setPageError(state: PageState, action: Actions.PageErrorAction): PageState {
    let pageError:PageError | undefined = undefined;
    if (action.pageErrorType) {
      pageError = {
        type: action.pageErrorType,
      };
    }
    return {
      ...state,
      ui: {
        ...state.ui,
        pageError,
      },
    };
  }

  static setSelectedPagePart(state: PageState, action: Actions.SelectedPagePartAction): PageState {
    let selectedPagePart = undefined;
    if (action.selectedPagePart) {
      selectedPagePart = action.selectedPagePart;
    }
    return {
      ...state,
      ui: {
        ...state.ui,
        selectedPagePart,
      },
    };
  }
}

export default pageReducer;