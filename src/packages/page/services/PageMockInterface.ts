import { Page } from '../entities/Page';
import { PageInterface } from './PageService';
import mockPageController from './mock/MockPageController';
import { MockInterface } from '../../../utils/MockLogger';
import { HttpRequestMethod } from '../../../utils/HttpHandler';
import { PageProperty } from '../entities/PageProperty';
import { PageDetail } from '../entities/PageDetail';

let errorCount = 0;

export class PageMockInterface implements PageInterface {
  async getPage(pageId: string):Promise<Page> {
    MockInterface.logRequest(this.getPage, { pageId });
    await MockInterface.wait(HttpRequestMethod.Get);
    const page = mockPageController.getPage(pageId);
    MockInterface.logResponse(this.getPage, { page: page.json() });
    if (errorCount < 0) {
      errorCount++;
      throw new Error('failed getPage');
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

  async setProperties(pageId: string, properties?: PageProperty[]): Promise<void> {
    MockInterface.logRequest(this.setProperties, { pageId, properties });
    await MockInterface.wait(HttpRequestMethod.Put);
    mockPageController.setPageProperties(pageId, properties);
    MockInterface.logResponse(this.setPageOverview, {});
    if (errorCount < 0) {
      errorCount++;
      throw new Error('failed setPageOverview');
    }
    errorCount = 0;
  }

  async setDetails(pageId: string, details?: PageDetail[]): Promise<void> {
    MockInterface.logRequest(this.setDetails, { pageId, details });
    await MockInterface.wait(HttpRequestMethod.Put);
    mockPageController.setPageDetails(pageId, details);
    MockInterface.logResponse(this.setPageOverview, {});
    if (errorCount < 0) {
      errorCount++;
      throw new Error('failed setPageOverview');
    }
    errorCount = 0;
  }
}

export default new PageMockInterface();
