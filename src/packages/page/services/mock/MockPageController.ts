import { Page } from '../../entities/Page';
import { getDefaultPages } from './mockPageDefaults';
import { GuidGenerator } from '../../../../utils/GuidGenerator';
import { PageProperty } from '../../entities/PageProperty';
import { PageDetail } from '../../entities/PageDetail';

export class MockPageController {
  pages: Record<string, Page>;
  
  constructor(pages?: Page[]) {
    this.pages = {};
    if (pages && pages.length) {
      for (const page of pages) {
        this.pages[page.id] = page;
      }
    }
  }

  getPage(pageId: string):Page {
    return this.pages[pageId].copy();
  }

  setPageOverview(pageId: string, title: string, summary: string) {
    this.pages[pageId].title = title;
    this.pages[pageId].summary = summary;
  }

  setPageProperties(pageId: string, properties?: PageProperty[]) {
    if (properties === undefined) {
      this.pages[pageId].properties = [];
    } else {
      this.pages[pageId].properties = properties;
    }
  }

  setPageDetails(pageId: string, details?: PageDetail[]) {
    if (details === undefined) {
      this.pages[pageId].details = [];
    } else {
      this.pages[pageId].details = details;
    }
  }

  setPage(page: Page) {
    const _page = page.copy();
    this.pages[page.id] = _page;
  }

  removePage(pageId: string) {
    delete this.pages[pageId];
  }

  addPage(pageTitle: string):Page {
    const pageId = GuidGenerator.generate('PG', 15);
    const page = new Page(pageId, pageTitle);
    this.setPage(page);
    return page;
  }
}

export default new MockPageController(getDefaultPages());