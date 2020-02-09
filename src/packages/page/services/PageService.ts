import { Page } from "../entities/Page";

export interface PageInterface {
  fetchPage(pageId: string): Promise<Page>;
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

  private get missingPageInterface():Error {
    return new Error(`pageInterface not set`);
  }
}

export default new PageService();
