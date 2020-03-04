import httpHandler from '../../../utils/HttpHandler';
import { PageFactory } from './PageFactory';
import { Page } from '../entities/Page';
import { PageInterface } from './PageService';
import { PageProperty } from '../entities/PageProperty';
import { PageDetail } from '../entities/PageDetail';

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

  async setProperties(pageId: string, properties?: PageProperty[]):Promise<void> {
    const propertiesData = [];
    if (properties !== undefined) {
      for (const property of properties) {
        propertiesData.push(property.json());
      }
    }
    const body = {
      properties: propertiesData,
    };
    await httpHandler.jsonPut(`api/pages/${pageId}`, undefined, undefined, body);
  }

  async setDetails(pageId: string, details?: PageDetail[]):Promise<void> {
    const detailsData = [];
    if (details !== undefined) {
      for (const property of details) {
        detailsData.push(property.json());
      }
    }
    const body = {
      details: detailsData,
    };
    await httpHandler.jsonPut(`api/pages/${pageId}`, undefined, undefined, body);
  }
}

export default new PageHttpInterface();
