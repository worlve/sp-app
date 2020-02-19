import httpHandler from '../../../utils/HttpHandler';
import { PageFactory } from './PageFactory';
import { Page } from '../entities/Page';
import { PageInterface } from './PageService';

export class PageHttpInterface implements PageInterface {
  async fetchPage(pageId: string):Promise<Page> {
    const data = await httpHandler.jsonGet(`api/pages/${pageId}`);
    return PageFactory.buildPage(data.result);
  }

  async setPageOverview(pageId: string, title: string, summary?: string):Promise<void> {
    const body = {
      title,
      summary,
    };
    await httpHandler.jsonPut(`api/pages/${pageId}`, undefined, undefined, body);
  }
}

export default new PageHttpInterface();
