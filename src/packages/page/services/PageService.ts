import { Page } from "../entities/Page";

export interface PageInterface {
  fetchPage(pageId: string): Promise<Page>;
  setPageOverview(pageId: string, title: string, summary?: string): Promise<void>;
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

  private get missingPageInterface():Error {
    return new Error(`pageInterface not set`);
  }
}

export default new PageService();
