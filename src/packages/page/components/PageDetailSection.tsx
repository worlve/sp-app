import React, { ReactElement } from 'react';
import CastAccordion from '../../shared/components/CastAccordion';
import { PageDetail } from '../entities/PageDetail';
import CastPartition from '../../shared/components/CastPartition';
import PageState from '../state/PageState';
import { SelectedPagePartType, SelectedPagePart } from '../entities/SelectedPagePart';

export interface PageDetailSectionProps {
  detail: PageDetail;
  selectedPagePart: SelectedPagePart;
}

const PageDetailSection = (props: PageDetailSectionProps):ReactElement => {
  const handleOnClickDetail = () => {
    PageState.selectPagePart(SelectedPagePartType.Detail, props.detail.id, props.detail.id);
  };

  const handleClickAwayDetail = () => {
    PageState.deselectPagePart();
  }

  return (
    <CastAccordion
      elementId={props.detail.id}
      title={props.detail.title}
      summary={props.detail.summary}
      onClick={handleOnClickDetail}
      highlight={props.selectedPagePart.id === props.detail.id}
      onCollapse={handleClickAwayDetail}>
      {props.detail && props.detail.partitions.map((partition, index) => (
        <CastPartition
          key={index}
          partition={partition} />
      ))}
    </CastAccordion>
  );
}

export default PageDetailSection;
