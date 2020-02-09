import { HttpHandler } from '../../../utils/HttpHandler';
import { PageFactory } from './PageFactory';
import { Page } from '../entities/Page';
import { PageInterface } from './PageService';

export class PageHttpInterface implements PageInterface {
  constructor() {
  }

  async fetchPage(pageId: string):Promise<Page> {
    const data = await HttpHandler.jsonGet(`api/pages/${pageId}`);
    return PageFactory.buildPage(data.result);
  }
}

export default new PageHttpInterface();
