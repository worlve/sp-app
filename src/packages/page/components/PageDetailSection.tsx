import React, { ReactElement } from 'react';
import CastAccordion from '../../shared/components/CastAccordion';
import { PageDetail } from '../entities/PageDetail';
import CastPartition from '../../shared/components/CastPartition';
import PageState from '../state/PageState';
import { SelectedPagePartType, SelectedPagePart, getSelectedPagePart, SelectedPagePartAction } from '../entities/SelectedPagePart';
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
  };

  const handleContentChange = (newContent: string) => {
    if (!props.onDetailChange) {
      return;
    }
    props.onDetailChange(props.detail.title, props.detail.summary, newContent);
  };

  const handleTitleChange = (newTitle: string) => {
    if (!props.onDetailChange) {
      return;
    }
    props.onDetailChange(newTitle, props.detail.summary, props.detail.markdown || '');
  };

  const handleSummaryChange = (newSummary: string) => {
    if (!props.onDetailChange) {
      return;
    }
    props.onDetailChange(props.detail.title, newSummary, props.detail.markdown || '');
  };

  return (
    <React.Fragment>
      {props.editing && getSelectedPagePart(props).id === props.detail.id &&
        <EditCastAccordion
          elementId={props.detail.id}
          title={props.detail.title}
          summary={props.detail.summary}
          content={props.detail.markdown}
          onContentChange={handleContentChange}
          onTitleChange={handleTitleChange}
          onSummaryChange={handleSummaryChange}>
        </EditCastAccordion>
      }
      {!(props.editing && getSelectedPagePart(props).id === props.detail.id) &&
        <CastAccordion
          elementId={props.detail.id}
          title={props.detail.title}
          summary={props.detail.summary}
          onClick={handleOnClickDetail}
          highlight={getSelectedPagePart(props).id === props.detail.id}
          onCollapse={handleClickAwayDetail}
          disabled={getSelectedPagePart(props).action === SelectedPagePartAction.Editing}>
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
