export interface Action {
  type: string;
}

export default class {
  componentTag: string;

  constructor(componentTag: string) {
    this.componentTag = componentTag;
  }

  actionType(base: string):string {
    return `${this.componentTag}_${base}`;
  }
}
