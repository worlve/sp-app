import * as Actions from './actions';
import { Page } from '../entities/Page';

export interface PageStateEntities {
  page?: Page;
}

export interface PageState {
  entities: PageStateEntities;
};

const initialState:PageState = {
  entities: {
    page: undefined
  },
};

const pageReducer = (state = initialState, action: any): PageState => {
  let newState = state;
  switch(action.type) {
    case Actions.GET_PAGE.SUCCESS:
      return PageStateEntitiesReducer.setPage(newState, action.page);
    default:
      return state;
  }
}

class PageStateEntitiesReducer {
  static setPage(state: PageState, page: Page): PageState {
    const pageData = page.json();
    return {
      ...state,
      entities: {
        ...state.entities,
        page: pageData,
      },
    };
  }
}

export default pageReducer;