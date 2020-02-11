import { Page } from '../../entities/Page';
import { getDefaultPages } from './mockPageDefaults';
import { GuidGenerator } from '../../../../utils/GuidGenerator';

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