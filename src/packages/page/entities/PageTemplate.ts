export class PageTemplate {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  copy():PageTemplate {
    return new PageTemplate(this.id);
  }
}