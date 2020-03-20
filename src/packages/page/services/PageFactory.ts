import { PageProperty, NumberPageProperty, PagePropertyType, StringPageProperty } from '../entities/PageProperty';
import { Page } from '../entities/Page';
import { PageDetail } from '../entities/PageDetail';
import { PageDetailFactory } from './PageDetailFactory';

export class PageFactory {
  static buildPage(pageData: any):Page {
    const page = new Page(pageData.id, pageData.title, pageData.versionId, pageData.pageTemplateId, pageData.permissionType);
    page.summary = pageData.summary;
    page.properties = PageFactory.buildPageProperties(pageData.properties);
    page.details = PageFactory.buildPageDetails(pageData.details);
    return page;
  }

  private static buildPageProperties(pagePropertiesData: any[]):PageProperty[] {
    if (!pagePropertiesData) {
      return [];
    }
    const properties = [];
    for (const pagePropertyData of pagePropertiesData) {
      properties.push(PageFactory.buildPageProperty(pagePropertyData));
    }
    return properties;
  }

  private static buildPageProperty(pagePropertyData: any):PageProperty {
    switch (pagePropertyData.type) {
      case PagePropertyType.Number:
        return new NumberPageProperty(pagePropertyData.key, pagePropertyData.value);
      case PagePropertyType.String:
        return new StringPageProperty(pagePropertyData.key, pagePropertyData.value);
      default:
        throw new Error(`unexpected property type: ${pagePropertyData.type}`);
    }
  }

  private static buildPageDetails(pageDetailsData: any[]):PageDetail[] {
    if (!pageDetailsData) {
      return [];
    }
    const details = [];
    for (const pageDetailData of pageDetailsData) {
      details.push(PageDetailFactory.buildPageDetail(pageDetailData));
    }
    return details;
  }
}