import { PageProperty } from './PageProperty';
import { PageDetail } from './PageDetail';
import { Version } from './Version';
import { PermissionType } from './PermissionType';
import { PageTemplate } from './PageTemplate';

export class Page {
  id: string;
  title: string;
  summary: string;
  properties: PageProperty[];
  details: PageDetail[];
  version: Version;
  pageTemplate: PageTemplate;
  permissionType: PermissionType;

  constructor(id?: string, title?: string, versionId?: string, pageTemplateId?: string, permissionType?: PermissionType) {
    this.id = id || '';
    this.title = title || '';
    this.summary = '';
    this.properties = [];
    this.details = [];
    this.version = new Version(versionId || '');
    this.pageTemplate = new PageTemplate(pageTemplateId || '');
    if (!permissionType) {
      this.permissionType = PermissionType.Private;
    } else {
      this.permissionType = permissionType;
    }
  }

  copy():Page {
    const page = new Page(this.id, this.title, this.version.id, this.pageTemplate.id, this.permissionType);
    page.summary = this.summary;
    page.properties = this.copyPageProperties();
    page.details = this.copyPageDetails();
    page.version = this.version.copy();
    page.pageTemplate = this.pageTemplate.copy();
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
      versionId: this.version.id,
      pageTemplateId: this.pageTemplate.id,
      permissionType: this.permissionType,
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