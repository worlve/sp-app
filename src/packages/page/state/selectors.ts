import { createSelector } from 'reselect';
import { PageFactory } from '../services/PageFactory';

const getPage = (state: any) =>
  state.page.entities.page;

export const makeGetPage = () => {
  return createSelector(
    [ getPage ],
    (pageData: any) => {
      return PageFactory.buildPage(pageData);
    }
  )
}
