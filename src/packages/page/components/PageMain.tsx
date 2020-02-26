import React, { ReactElement, useState, useEffect } from 'react';
import { Page } from '../entities/Page';
import CastPageOverview from '../../shared/components/CastPageOverview';
import CastProperty from '../../shared/components/CastProperty';
import PageDetailSection from './PageDetailSection';
import CastPage from '../../shared/components/CastPage';
import { TitleTag } from '../../shared/entities/TitleTag';
import CastSection from '../../shared/components/CastSection';
import CastHighlightWrapper from '../../shared/components/CastHighlightWrapper';
import localizer from '../../../utils/Localizer';
import { SelectedPagePart, SelectedPagePartType, PagePartElementId, SelectedPagePartAction, getSelectedPagePart } from '../entities/SelectedPagePart';
import PageState from '../state/PageState';

export interface PageMainProps {
  page?: Page;
  selectedPagePart?: SelectedPagePart;
}

const PageMain = (props: PageMainProps):ReactElement => {
  const pageTitle = props.page?.title;
  const pageSummary = props.page?.summary;
  const editing = getSelectedPagePart(props).type === SelectedPagePartType.Overview && getSelectedPagePart(props).action === SelectedPagePartAction.Editing;

  const [ draftTitle, setDraftTitle ] = useState(pageTitle);
  const [ draftSummary, setDraftSummary ] = useState(pageSummary);

  useEffect(() => {
    setDraftTitle(pageTitle);
    setDraftSummary(pageSummary);
  }, [pageTitle, pageSummary, editing]);

  const handleOnTitleChange = (newTitle: string) => {
    PageState.draftTitle = newTitle;
    setDraftTitle(newTitle);
    if (!newTitle) {
      PageState.canSaveSelectedPagePart(false);
    }
    if (newTitle && !draftTitle) {
      PageState.canSaveSelectedPagePart(true);
    }
  };

  useEffect(() => {
    if (editing) {
      PageState.draftTitle = pageTitle || '';
      PageState.draftSummary = pageSummary || '';
    }
  // eslint-disable-next-line
  }, [editing]);

  const handleOnSummaryChange = (newSummary: string) => {
    PageState.draftSummary = newSummary;
    setDraftSummary(newSummary);
  };

  const handleOnClickPageOverview = () => {
    PageState.selectPagePart(SelectedPagePartType.Overview, PagePartElementId.PageOverview);
  };

  const handleOnClickProperties = () => {
    PageState.selectPagePart(SelectedPagePartType.Properties, PagePartElementId.Properties);
  };

  return (
    <CastPage>
      <CastHighlightWrapper
        onClick={handleOnClickPageOverview}
        highlight={getSelectedPagePart(props).type === SelectedPagePartType.Overview}
        anchorId={PagePartElementId.PageOverview}
        disableHover={!!getSelectedPagePart(props).action}>
        <CastPageOverview
          titleTag={TitleTag.Header1}
          title={draftTitle}
          summary={draftSummary}
          editing={editing}
          onTitleChange={(newTitle: string) => handleOnTitleChange(newTitle)}
          onSummaryChange={(newSummary: string) => handleOnSummaryChange(newSummary)} />
      </CastHighlightWrapper>
      <CastSection
        hideTitle={!props.page}
        titleTag={TitleTag.Header2}
        title={localizer.localeMap.page.properties}>
        <CastHighlightWrapper
          onClick={handleOnClickProperties}
          highlight={getSelectedPagePart(props).type === SelectedPagePartType.Properties}
          anchorId={PagePartElementId.Properties}
          disableHover={getSelectedPagePart(props).action === SelectedPagePartAction.Editing}>
          {props.page && props.page.properties.map(property => (
            <CastProperty
              key={property.key}
              propertyKey={property.key}
              value={property.value} />
          ))}
        </CastHighlightWrapper>
      </CastSection>
      <CastSection
        hideTitle={!props.page}
        titleTag={TitleTag.Header2}
        title={localizer.localeMap.page.details}>
        {/* @TODO: PageDetailSection.CastAccordian.ExpansionPanel requires 
          an element with the class of 'root' surrounding it to display properly. */}
        <div className='root'>
          {props.page && props.page.details.map(detail => (
            <PageDetailSection
              key={detail.id}
              detail={detail}
              selectedPagePart={props.selectedPagePart} />
          ))}
        </div>
      </CastSection>
    </CastPage>
  );
}

export default PageMain;
