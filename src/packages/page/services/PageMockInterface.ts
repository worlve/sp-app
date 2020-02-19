import { Page } from '../entities/Page';
import { PageInterface } from './PageService';
import mockPageController from './mock/MockPageController';
import { MockInterface } from '../../../utils/MockLogger';
import { HttpRequestMethod } from '../../../utils/HttpHandler';

let errorCount = 0;

export class PageMockInterface implements PageInterface {
  async fetchPage(pageId: string):Promise<Page> {
    MockInterface.logRequest(this.fetchPage, { pageId });
    await MockInterface.wait(HttpRequestMethod.Get);
    const page = mockPageController.getPage(pageId);
    MockInterface.logResponse(this.fetchPage, { page: page.json() });
    if (errorCount < 0) {
      errorCount++;
      throw new Error('failed fetchPage');
    }
    errorCount = 0;
    return page;
  }

  async setPageOverview(pageId: string, title: string, summary: string): Promise<void> {
    MockInterface.logRequest(this.setPageOverview, { pageId, title, summary });
    await MockInterface.wait(HttpRequestMethod.Put);
    mockPageController.setPageOverview(pageId, title, summary);
    MockInterface.logResponse(this.setPageOverview, {});
    if (errorCount < 0) {
      errorCount++;
      throw new Error('failed setPageOverview');
    }
    errorCount = 0;
  }
}

export default new PageMockInterface();
