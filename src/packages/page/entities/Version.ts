export class Version {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  copy():Version {
    return new Version(this.id);
  }
}