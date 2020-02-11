import React from 'react';
import CastPageContent from '../../shared/components/CastPageContent';
import { PageDetail } from '../entities/PageDetail';
import { TitleTag } from '../../shared/entities/TitleTag';
import CastPartition from '../../shared/components/CastPartition';

export interface PageDetailSectionProps {
  detail: PageDetail;
}

const PageDetailSection = (props: PageDetailSectionProps) => {
  return (
    <CastPageContent
      titleTag={TitleTag.Header3}
      title={props.detail.title}
      summary={props.detail.summary}>
      {props.detail && props.detail.partitions.map((partition, index) => (
        <CastPartition
          key={index}
          partition={partition} />
      ))}
    </CastPageContent>
  );
}

export default PageDetailSection;
