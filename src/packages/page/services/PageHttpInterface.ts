import httpHandler from '../../../utils/HttpHandler';
import { PageFactory } from './PageFactory';
import { Page } from '../entities/Page';
import { PageInterface } from './PageService';

export class PageHttpInterface implements PageInterface {
  async fetchPage(pageId: string):Promise<Page> {
    const data = await httpHandler.jsonGet(`api/pages/${pageId}`);
    return PageFactory.buildPage(data.result);
  }
}

export default new PageHttpInterface();
