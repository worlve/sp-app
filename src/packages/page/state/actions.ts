import ReduxAction from '../../../utils/ReduxAction';
import { Page } from '../entities/Page';

const ra = new ReduxAction('ROOT');

export const GET_PAGE = ra.createRequestTypes('GET_PAGE');
export const getPage = {
  request: (pageId: string) => ReduxAction.action(GET_PAGE.REQUEST, { pageId }),
  success: (page: Page) => ReduxAction.action(GET_PAGE.SUCCESS, { page }),
};

