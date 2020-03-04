import { Page } from "../entities/Page";
import { PageProperty } from "../entities/PageProperty";
import { PageDetail } from "../entities/PageDetail";

export interface PageInterface {
  fetchPage(pageId: string): Promise<Page>;
  setPageOverview(pageId: string, title: string, summary?: string): Promise<void>;
  setProperties(pageId: string, properties?: PageProperty[]): Promise<void>;
  setDetails(pageId: string, details?: PageDetail[]): Promise<void>;
}

export class PageService {
  pageInterface?: PageInterface;

  constructor(pageInterface?: PageInterface) {
    this.pageInterface = pageInterface;
  }

  async fetchPage(pageId: string):Promise<Page> {
    if (!this.pageInterface) {
      throw this.missingPageInterface;
    }
    return this.pageInterface.fetchPage(pageId);
  }

  async setPageOverview(pageId: string, title: string, summary?: string):Promise<void> {
    if (!this.pageInterface) {
      throw this.missingPageInterface;
    }
    return this.pageInterface.setPageOverview(pageId, title, summary);
  }

  async setProperties(pageId: string, properties: PageProperty[]):Promise<void> {
    if (!this.pageInterface) {
      throw this.missingPageInterface;
    }
    return this.pageInterface.setProperties(pageId, properties);
  }

  async setDetails(pageId: string, details: PageDetail[]):Promise<void> {
    if (!this.pageInterface) {
      throw this.missingPageInterface;
    }
    return this.pageInterface.setDetails(pageId, details);
  }

  private get missingPageInterface():Error {
    return new Error(`pageInterface not set`);
  }
}

export default new PageService();
