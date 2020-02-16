import React, { ReactElement } from 'react';
import CastAccordion from '../../shared/components/CastAccordion';
import { PageDetail } from '../entities/PageDetail';
import CastPartition from '../../shared/components/CastPartition';

export interface PageDetailSectionProps {
  detail: PageDetail;
  onClickDetail?: () => void;
  highlight?: boolean;
}

const PageDetailSection = (props: PageDetailSectionProps):ReactElement => {
  return (
    <CastAccordion
      elementId={props.detail.id}
      title={props.detail.title}
      summary={props.detail.summary}
      onClick={props.onClickDetail}
      highlight={props.highlight}>
      {props.detail && props.detail.partitions.map((partition, index) => (
        <CastPartition
          key={index}
          partition={partition} />
      ))}
    </CastAccordion>
  );
}

export default PageDetailSection;
