import httpHandler from '../../../utils/HttpHandler';
import { PageFactory } from './PageFactory';
import { Page } from '../entities/Page';
import { PageInterface } from './PageService';
import { PageProperty } from '../entities/PageProperty';
import { PageDetail } from '../entities/PageDetail';

interface PagesBatch {
  pages: Page[];
  nextPageId?: string;
  totalPages: number;
}

export class PageHttpInterface implements PageInterface {
  async getPage(pageId: string):Promise<Page> {
    const data = await httpHandler.jsonGet(`api/pages/${pageId}/full`);
    return PageFactory.buildPage(data.result);
  }

  async getPages(nextBatchId?: string):Promise<PagesBatch> {
    let params = {};
    if (nextBatchId) {
      params = {
        ...params,
        nextBatchId,
      };
    }
    const data = await httpHandler.jsonGet(`api/pages`, undefined, params);
    const pages = [];
    for (const page of data.result.batch) {
      pages.push(PageFactory.buildPage(page));
    }
    return {
      pages,
      nextPageId: data.result.nextBatch?.paramValue,
      totalPages: data.result.total,
    };
  }

  async createPage(page: Page):Promise<Page> {
    const body = {
      title: page.title,
      summary: page.summary,
      versionId: page.version.id,
      pageTemplateId: page.pageTemplate.id,
      permissionType: page.permissionType,
    }
    const data = await httpHandler.jsonPost(`api/pages`, undefined, undefined, body);
    const newPage = page.copy();
    newPage.id = data.result.id;
    return newPage;
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
    await httpHandler.jsonPut(`api/pages/${pageId}/properties`, undefined, undefined, body);
  }

  async setDetail(pageId: string, detail: PageDetail):Promise<void> {
    const partitions = [];
    for (const partition of detail.partitions) {
      partitions.push(partition.json());
    }
    const body = {
      id: detail.id,
      title: detail.title,
      summary: detail.summary,
      partitions: partitions,
    };
    await httpHandler.jsonPut(`api/pages/${pageId}/details/${detail.id}`, undefined, undefined, body);
  }

  async reorderDetails(pageId: string, details: PageDetail[]):Promise<void> {
    const detailIds = details.map(detail => detail.id);
    await httpHandler.jsonPut(`api/pages/${pageId}/details`, undefined, undefined, detailIds);
  }

  async createDetail(pageId: string, detail: PageDetail):Promise<PageDetail> {
    const partitions = [];
    for (const partition of detail.partitions) {
      partitions.push(partition.json());
    }
    const body = {
      title: detail.title,
      summary: detail.summary,
      partitions: partitions,
    };
    const data = await httpHandler.jsonPost(`api/pages/${pageId}/details/${detail.id}`, undefined, undefined, body);
    const newDetail = detail.copy();
    newDetail.id = data.result.id;
    return newDetail;
  }

  async removeDetail(pageId: string, detailId: string):Promise<void> {
    await httpHandler.jsonDelete(`api/pages/${pageId}/details/${detailId}`);
  }
}

export default new PageHttpInterface();
