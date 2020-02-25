import React, { ReactElement, useState } from 'react';
import { Page } from '../entities/Page';
import CastPageOverview from '../../shared/components/CastPageOverview';
import CastProperty from '../../shared/components/CastProperty';
import PageDetailSection from './PageDetailSection';
import CastPage from '../../shared/components/CastPage';
import { TitleTag } from '../../shared/entities/TitleTag';
import CastSection from '../../shared/components/CastSection';
import CastHighlightWrapper from '../../shared/components/CastHighlightWrapper';
import localizer from '../../../utils/Localizer';
import { SelectedPagePart, SelectedPagePartType, PagePartElementId, SelectedPagePartAction } from '../entities/SelectedPagePart';
import PageState from '../state/PageState';

export interface PageMainProps {
  page: Page;
  selectedPagePart: SelectedPagePart;
}

const PageMain = (props: PageMainProps):ReactElement => {
  const [ draftTitle, setDraftTitle ] = useState(props.page.title);
  const [ draftSummary, setDraftSummary ] = useState(props.page.summary);

  const handleOnTitleChange = (newTitle: string) => {
    PageState.draftTitle = newTitle;
    setDraftTitle(newTitle);
    if (!newTitle) {
      PageState.canSaveSelectedPagePart(false);
    }
    if (newTitle && !draftTitle) {
      PageState.canSaveSelectedPagePart(true);
    }
  }

  const handleOnSummaryChange = (newSummary: string) => {
    PageState.draftSummary = newSummary;
    setDraftSummary(newSummary);
  }

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
        highlight={props.selectedPagePart.type === SelectedPagePartType.Overview}
        anchorId={PagePartElementId.PageOverview}
        disableHover={!!props.selectedPagePart.action}>
        <CastPageOverview
          titleTag={TitleTag.Header1}
          title={draftTitle}
          summary={draftSummary}
          editing={props.selectedPagePart.type === SelectedPagePartType.Overview && props.selectedPagePart.action === SelectedPagePartAction.Editing}
          onTitleChange={(newTitle: string) => handleOnTitleChange(newTitle)}
          onSummaryChange={(newSummary: string) => handleOnSummaryChange(newSummary)} />
      </CastHighlightWrapper>
      <CastSection
        titleTag={TitleTag.Header2}
        title={localizer.localeMap.page.properties}>
        <CastHighlightWrapper
          onClick={handleOnClickProperties}
          highlight={props.selectedPagePart.type === SelectedPagePartType.Properties}
          anchorId={PagePartElementId.Properties}
          disableHover={props.selectedPagePart.action === SelectedPagePartAction.Editing}>
          {props.page && props.page.properties.map(property => (
            <CastProperty
              key={property.key}
              propertyKey={property.key}
              value={property.value} />
          ))}
        </CastHighlightWrapper>
      </CastSection>
      <CastSection
        titleTag={TitleTag.Header2}
        title={localizer.localeMap.page.details}>
        {/* @TODO: PageDetailSection.CastAccordian.ExpansionPanel requires 
          an element with the class of 'root' surrounding it to display properly. */}
        <div className='root'>
          {props.page && props.page.details.map(detail => (
            <PageDetailSection
              key={detail.id}
              detail={detail} />
          ))}
        </div>
      </CastSection>
    </CastPage>
  );
}

export default PageMain;
