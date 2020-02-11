import { PageDetail } from "../entities/PageDetail";
import { PageDetailPartition, PageDetailPartitionType, PageDetailPartitionHeader1, PageDetailPartitionHeader2, PageDetailPartitionHeader3, PageDetailPartitionHeader4, PageDetailPartitionHeader5, PageDetailPartitionHeader6, PageDetailPartitionParagraph, PageDetailPartitionText, PageDetailPartitionBold, PageDetailPartitionItalics, PageDetailPartitionQuoteblock, PageDetailPartitionLink, PageDetailPartitionRelation, PageDetailPartitionColor, PageDetailPartitionUnorderedList, PageDetailPartitionOrderedList, PageDetailPartitionImage, PageDetailPartitionPageBreak } from "../entities/PageDetailPartition";

export class PageDetailFactory {
  static buildPageDetail(pageDetailData: any):PageDetail {
    const pageDetail = new PageDetail(pageDetailData.id, pageDetailData.title);
    pageDetail.summary = pageDetailData.summary;
    pageDetail.partitions = PageDetailFactory.buildPageDetailPartitions(pageDetailData.partitions);
    return pageDetail;
  }

  private static buildPageDetailPartitions(pageDetailPartitionsData: any[]):PageDetailPartition[] {
    if (!pageDetailPartitionsData) {
      return [];
    }
    const partitions = [];
    for (const partitionData of pageDetailPartitionsData) {
      partitions.push(PageDetailFactory.buildPageDetailPartition(partitionData));
    }
    return partitions;
  }

  static buildPageDetailPartition(partitionData: any):PageDetailPartition {
    const items = PageDetailFactory.buildPageDetailPartitions(partitionData.items);
    switch(partitionData.type) {
      case PageDetailPartitionType.Header1:
        return new PageDetailPartitionHeader1(partitionData.value);
      case PageDetailPartitionType.Header2:
        return new PageDetailPartitionHeader2(partitionData.value);
      case PageDetailPartitionType.Header3:
        return new PageDetailPartitionHeader3(partitionData.value);
      case PageDetailPartitionType.Header4:
        return new PageDetailPartitionHeader4(partitionData.value);
      case PageDetailPartitionType.Header5:
        return new PageDetailPartitionHeader5(partitionData.value);
      case PageDetailPartitionType.Header6:
        return new PageDetailPartitionHeader6(partitionData.value);
      case PageDetailPartitionType.Paragraph:
        return PageDetailFactory.setPartitionProperties(new PageDetailPartitionParagraph(), partitionData);
      case PageDetailPartitionType.Text:
        return PageDetailFactory.setPartitionProperties(new PageDetailPartitionText(), partitionData);
      case PageDetailPartitionType.Bold:
        return PageDetailFactory.setPartitionProperties(new PageDetailPartitionBold(), partitionData);
      case PageDetailPartitionType.Italics:
        return PageDetailFactory.setPartitionProperties(new PageDetailPartitionItalics(), partitionData);
      case PageDetailPartitionType.Quoteblock:
        return PageDetailFactory.setPartitionProperties(new PageDetailPartitionQuoteblock(), partitionData);
      case PageDetailPartitionType.Link:
        return new PageDetailPartitionLink(partitionData.value, partitionData.link);
      case PageDetailPartitionType.Relation:
        return new PageDetailPartitionRelation(partitionData.value, partitionData.relation);
      case PageDetailPartitionType.Color:
        return new PageDetailPartitionColor(partitionData.value, partitionData.color);
      case PageDetailPartitionType.UnorderedList:
        return new PageDetailPartitionUnorderedList(items);
      case PageDetailPartitionType.OrderedList:
        return new PageDetailPartitionOrderedList(items);
      case PageDetailPartitionType.Image:
        return new PageDetailPartitionImage(partitionData.altText, partitionData.link);
      case PageDetailPartitionType.PageBreak:
        return new PageDetailPartitionPageBreak();
      default:
        throw new Error(`unexpected partition type: ${partitionData.type}`);
    }
  }

  private static setPartitionProperties(partition: PageDetailPartition, partitionData: any):PageDetailPartition {
    if (partitionData.value) {
      partition.value = partitionData.value;
    }
    if (partitionData.partitions) {
      partition.partitions = PageDetailFactory.buildPageDetailPartitions(partitionData.partitions);
    }
    return partition;
  }
}