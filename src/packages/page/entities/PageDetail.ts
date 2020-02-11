import { PageDetailPartition } from "./PageDetailPartition";

export class PageDetail {
  id: string;
  title: string;
  summary: string;
  partitions: PageDetailPartition[];

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
    this.summary = '';
    this.partitions = [];
  }

  copy():PageDetail {
    const pageDetail = new PageDetail(this.id, this.title);
    pageDetail.summary = this.summary;
    pageDetail.partitions = this.copyPartitions();
    return pageDetail;
  }

  protected copyPartitions():PageDetailPartition[] {
    const partitions = [];
    for (const partition of this.partitions) {
      partitions.push(partition.copy());
    }
    return partitions;
  }

  json():any {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
      partitions: this.jsonPartitions(),
    };
  }

  protected jsonPartitions():any[] {
    const partitionsData = [];
    for (const partition of this.partitions) {
      partitionsData.push(partition.json());
    }
    return partitionsData;
  }
}