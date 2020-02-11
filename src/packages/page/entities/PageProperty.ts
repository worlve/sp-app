export enum PagePropertyType {
  Number = 'number',
  String = 'string',
}

export class PageProperty {
  type: PagePropertyType;
  key: string;
  value?: any;

  constructor(key: string, type: PagePropertyType, value?: any) {
    this.key = key;
    this.type = type;
    this.value = value;
  }

  copy():PageProperty {
    throw new Error(`must call extension of base class`);
  }

  json():any {
    return {
      key: this.key,
      type: this.type,
      value: this.value,
    };
  }
}

export class NumberPageProperty extends PageProperty {
  constructor(key: string, value?: number) {
    super(key, PagePropertyType.Number, value);
  }

  copy():NumberPageProperty {
    return new NumberPageProperty(this.key, this.value);
  }
}

export class StringPageProperty extends PageProperty {
  constructor(key: string, value?: string) {
    super(key, PagePropertyType.String, value);
  }

  copy():StringPageProperty {
    return new StringPageProperty(this.key, this.value);
  }
}
