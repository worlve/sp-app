import React, { ReactElement } from 'react';
import CastAccordion from '../../shared/components/CastAccordion';
import { PageDetail } from '../entities/PageDetail';
import CastPartition from '../../shared/components/CastPartition';
import PageState from '../state/PageState';
import { SelectedPagePartType, SelectedPagePart, getSelectedPagePart } from '../entities/SelectedPagePart';
import EditCastAccordion from '../../shared/components/edit/EditCastAccordion';

export interface PageDetailSectionProps {
  detail: PageDetail;
  selectedPagePart?: SelectedPagePart;
  editing?: boolean;
  onDetailChange?: (newTitle: string, newSummary: string, newMarkdown: string) => void;
}

const PageDetailSection = (props: PageDetailSectionProps):ReactElement => {
  const handleOnClickDetail = () => {
    PageState.selectPagePart(SelectedPagePartType.Detail, props.detail.id, props.detail.id);
  };

  const handleClickAwayDetail = () => {
    PageState.deselectPagePart();
  }

  return (
    <React.Fragment>
      {props.editing &&
        <EditCastAccordion
          elementId={props.detail.id}
          title={props.detail.title}
          summary={props.detail.summary}
          content={props.detail.markdown}
          onDetailChange={props.onDetailChange}>
        </EditCastAccordion>
      }
      {!props.editing &&
        <CastAccordion
          elementId={props.detail.id}
          title={props.detail.title}
          summary={props.detail.summary}
          onClick={handleOnClickDetail}
          highlight={getSelectedPagePart(props).id === props.detail.id}
          onCollapse={handleClickAwayDetail}>
          {props.detail?.partitions?.map((partition, index) => (
            <CastPartition
              key={index}
              partition={partition} />
          ))}
        </CastAccordion>
      }
    </React.Fragment>
  );
}

export default PageDetailSection;
