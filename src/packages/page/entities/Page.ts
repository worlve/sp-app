import { PageProperty } from './PageProperty';
import { PageDetail } from './PageDetail';

export class Page {
  id: string;
  title: string;
  summary: string;
  properties: PageProperty[];
  details: PageDetail[];

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
    this.summary = '';
    this.properties = [];
    this.details = [];
  }

  copy():Page {
    const page = new Page(this.id, this.title);
    page.summary = this.summary;
    page.properties = this.copyPageProperties();
    page.details = this.copyPageDetails();
    return page;
  }

  protected copyPageProperties():PageProperty[] {
    const properties = [];
    for (const property of this.properties) {
      properties.push(property.copy());
    }
    return properties;
  }

  protected copyPageDetails():PageDetail[] {
    const details = [];
    for (const detail of this.details) {
      details.push(detail.copy());
    }
    return details;
  }

  json():any {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
      properties: this.jsonPageProperties(),
      details: this.jsonPageDetails(),
    };
  }

  protected jsonPageProperties():any[] {
    const properties = [];
    for (const property of this.properties) {
      properties.push(property.json());
    }
    return properties;
  }

  protected jsonPageDetails():any[] {
    const details = [];
    for (const detail of this.details) {
      details.push(detail.json());
    }
    return details;
  }
}