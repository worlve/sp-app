export enum PageDetailPartitionType {
  Header1 = 'h1',
  Header2 = 'h2',
  Header3 = 'h3',
  Header4 = 'h4',
  Header5 = 'h5',
  Header6 = 'h6',
  Paragraph = 'p',
  Text = 'text',
  Bold = 'bold',
  Italics = 'italics',
  Link = 'link',
  Relation = 'relation',
  Color = 'color',
  UnorderedList = 'ul',
  OrderedList = 'ol',
  Image = 'image',
  PageBreak = 'hr',
  Quoteblock = 'quotes',
}

export class PageDetailPartition {
  type: PageDetailPartitionType;
  private _value?: string;
  private _partitions?: PageDetailPartition[]; 

  constructor(type: PageDetailPartitionType) {
    this.type = type;
  }

  set value(value: string) {
    if (this.hasPartitions) {
      throw new Error(`cannot have both value and partitions set`);
    }
    this._value = value;
  }

  set partitions(partitions: PageDetailPartition[]) {
    if (this.hasValue) {
      throw new Error(`cannot have both value and partitions set`);
    }
    this._partitions = partitions;
  }

  get value():string {
    if (this._value === undefined) {
      throw new Error(`value is not set`);
    }
    return this._value;
  }

  get partitions():PageDetailPartition[] {
    if (this._partitions === undefined) {
      throw new Error(`partitions is not set`);
    }
    return this._partitions;
  }

  get hasPartitions():boolean {
    return this._partitions !== undefined;
  }

  get hasValue():boolean {
    return this._value !== undefined;
  }

  copy():PageDetailPartition {
    throw new Error(`cannot copy base class`);
  }

  protected setCopyProperties(copyPartition: PageDetailPartition):PageDetailPartition {
    if (this.hasPartitions) {
      copyPartition.partitions = this.partitions;
    }
    if (this.hasValue) {
      copyPartition.value = this.value;
    }
    return copyPartition;
  }

  json():any {
    if (this.hasValue) {
      return {
        type: this.type,
        value: this.value
      };
    }
    if (this.hasPartitions) {
      return {
        type: this.type,
        partitions: this.jsonPartitions(this.partitions),
      }
    }
    return {
      type: this.type
    };
  }

  protected jsonPartitions(partitions: PageDetailPartition[]):any[] {
    const partitionsData = [];
    for (const partition of partitions) {
      partitionsData.push(partition.json());
    }
    return partitionsData;
  }
}

class PageDetailPartitionHeader extends PageDetailPartition {
  constructor(type: PageDetailPartitionType, value: string) {
    super(type);
    this.value = value;
  }
}

export class PageDetailPartitionHeader1 extends PageDetailPartitionHeader {
  constructor(value: string) {
    super(PageDetailPartitionType.Header1, value);
  }

  copy():PageDetailPartitionHeader1 {
    return new PageDetailPartitionHeader1(this.value);
  }
}

export class PageDetailPartitionHeader2 extends PageDetailPartitionHeader {
  constructor(value: string) {
    super(PageDetailPartitionType.Header2, value);
  }

  copy():PageDetailPartitionHeader2 {
    return new PageDetailPartitionHeader2(this.value);
  }
}

export class PageDetailPartitionHeader3 extends PageDetailPartitionHeader {
  constructor(value: string) {
    super(PageDetailPartitionType.Header3, value);
  }

  copy():PageDetailPartitionHeader3 {
    return new PageDetailPartitionHeader3(this.value);
  }
}

export class PageDetailPartitionHeader4 extends PageDetailPartitionHeader {
  constructor(value: string) {
    super(PageDetailPartitionType.Header4, value);
  }

  copy():PageDetailPartitionHeader4 {
    return new PageDetailPartitionHeader4(this.value);
  }
}

export class PageDetailPartitionHeader5 extends PageDetailPartitionHeader {
  constructor(value: string) {
    super(PageDetailPartitionType.Header5, value);
  }

  copy():PageDetailPartitionHeader5 {
    return new PageDetailPartitionHeader5(this.value);
  }
}

export class PageDetailPartitionHeader6 extends PageDetailPartitionHeader {
  constructor(value: string) {
    super(PageDetailPartitionType.Header6, value);
  }

  copy():PageDetailPartitionHeader6 {
    return new PageDetailPartitionHeader6(this.value);
  }
}

export class PageDetailPartitionParagraph extends PageDetailPartition {
  constructor() {
    super(PageDetailPartitionType.Paragraph);
  }

  copy():PageDetailPartitionParagraph {
    return this.setCopyProperties(new PageDetailPartitionParagraph());
  }
}

export class PageDetailPartitionText extends PageDetailPartition {
  constructor() {
    super(PageDetailPartitionType.Text);
  }

  copy():PageDetailPartitionText {
    return this.setCopyProperties(new PageDetailPartitionText());
  }
}

export class PageDetailPartitionBold extends PageDetailPartition {
  constructor() {
    super(PageDetailPartitionType.Bold);
  }

  copy():PageDetailPartitionParagraph {
    return this.setCopyProperties(new PageDetailPartitionParagraph());
  }
}

export class PageDetailPartitionItalics extends PageDetailPartition {
  constructor() {
    super(PageDetailPartitionType.Italics);
  }

  copy():PageDetailPartitionItalics {
    return this.setCopyProperties(new PageDetailPartitionItalics());
  }
}

export class PageDetailPartitionQuoteblock extends PageDetailPartition {
  constructor() {
    super(PageDetailPartitionType.Quoteblock);
  }

  copy():PageDetailPartitionQuoteblock {
    return this.setCopyProperties(new PageDetailPartitionQuoteblock());
  }
}

export class PageDetailPartitionLink extends PageDetailPartition {
  link: string;

  constructor(value: string, link: string) {
    super(PageDetailPartitionType.Link);
    this.value = value;
    this.link = link;
  }

  copy():PageDetailPartitionLink {
    return new PageDetailPartitionLink(this.value, this.link);
  }

  json():any {
    return {
      type: this.type,
      value: this.value,
      link: this.link,
    };
  }
}

export class PageDetailPartitionRelation extends PageDetailPartition {
  relation: string;

  constructor(value: string, relation: string) {
    super(PageDetailPartitionType.Relation);
    this.value = value;
    this.relation = relation;
  }

  copy():PageDetailPartitionRelation {
    return new PageDetailPartitionRelation(this.value, this.relation);
  }

  json():any {
    return {
      type: this.type,
      value: this.value,
      relation: this.relation,
    };
  }
}

export class PageDetailPartitionColor extends PageDetailPartition {
  color: string;

  constructor(value: string, color: string) {
    super(PageDetailPartitionType.Color);
    this.value = value;
    this.color = color;
  }

  copy():PageDetailPartitionColor {
    return new PageDetailPartitionColor(this.value, this.color);
  }

  json():any {
    return {
      type: this.type,
      value: this.value,
      color: this.color,
    };
  }
}

class PageDetailPartitionList extends PageDetailPartition {
  items: PageDetailPartition[];

  constructor(type: PageDetailPartitionType, items: PageDetailPartition[]) {
    super(type);
    this.items = items;
  }

  set value(value: string) {
    throw new Error(`cannot set value`);
  }

  set partitions(partitions: PageDetailPartition[]) {
    throw new Error(`cannot set partitions`);
  }

  json():any {
    return {
      type: this.type,
      items: this.jsonPartitions(this.items)
    }
  }
}

export class PageDetailPartitionUnorderedList extends PageDetailPartitionList {
  constructor(items: PageDetailPartition[]) {
    super(PageDetailPartitionType.UnorderedList, items);
  }

  copy():PageDetailPartitionUnorderedList {
    return new PageDetailPartitionUnorderedList(this.items);
  }
}

export class PageDetailPartitionOrderedList extends PageDetailPartitionList {
  constructor(items: PageDetailPartition[]) {
    super(PageDetailPartitionType.OrderedList, items);
  }

  copy():PageDetailPartitionOrderedList {
    return new PageDetailPartitionOrderedList(this.items);
  }
}

export class PageDetailPartitionImage extends PageDetailPartition {
  altText: string;
  link: string;

  constructor(altText: string, link: string) {
    super(PageDetailPartitionType.Image);
    this.altText = altText;
    this.link = link;
  }

  set value(value: string) {
    throw new Error(`cannot set value`);
  }

  set partitions(partitions: PageDetailPartition[]) {
    throw new Error(`cannot set partitions`);
  }

  copy():PageDetailPartitionImage {
    return new PageDetailPartitionImage(this.altText, this.link);
  }

  json():any {
    return {
      type: this.type,
      altText: this.altText,
      link: this.link,
    }
  }
}

export class PageDetailPartitionPageBreak extends PageDetailPartition {
  constructor() {
    super(PageDetailPartitionType.PageBreak);
  }

  set value(value: string) {
    throw new Error(`cannot set value`);
  }

  set partitions(partitions: PageDetailPartition[]) {
    throw new Error(`cannot set partitions`);
  }

  copy():PageDetailPartitionPageBreak {
    return new PageDetailPartitionPageBreak();
  }

  json():any {
    return {
      type: this.type,
    }
  }
}
