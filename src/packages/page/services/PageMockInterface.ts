import { Page } from '../entities/Page';
import { PageInterface } from './PageService';
import mockPageController from './mock/MockPageController';
import { MockInterface } from '../../../utils/MockLogger';
import { HttpRequestMethod } from '../../../utils/HttpHandler';

export class PageMockInterface implements PageInterface {
  async fetchPage(pageId: string):Promise<Page> {
    MockInterface.logRequest(this.fetchPage, { pageId });
    await MockInterface.wait(HttpRequestMethod.Get);
    const page = mockPageController.getPage(pageId);
    MockInterface.logResponse(this.fetchPage, { page: page.json() });
    return page;
  }

  async setPageOverview(pageId: string, title: string, summary: string): Promise<void> {
    MockInterface.logRequest(this.setPageOverview, { pageId, title, summary });
    await MockInterface.wait(HttpRequestMethod.Put);
    mockPageController.setPageOverview(pageId, title, summary);
    MockInterface.logResponse(this.setPageOverview, {});
  }
}

export default new PageMockInterface();
