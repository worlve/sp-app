export class Page {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  copy():Page {
    return new Page(this.id, this.name);
  }

  json():any {
    return {
      id: this.id,
      name: this.name
    };
  }
}