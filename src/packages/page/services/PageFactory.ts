import { Page } from '../entities/Page';

export class PageFactory {
  static buildPage(pageData: any):Page {
    return new Page(pageData.id, pageData.name);
  }
}