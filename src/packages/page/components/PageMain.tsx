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
  const pageProperties = props.page?.properties;
  const pageDetails = props.page?.details;
  const editingPageOverview = getSelectedPagePart(props).type === SelectedPagePartType.Overview && getSelectedPagePart(props).action === SelectedPagePartAction.Editing;
  const editingProperties = getSelectedPagePart(props).type === SelectedPagePartType.Properties && getSelectedPagePart(props).action === SelectedPagePartAction.Editing;
  const editingDetails = getSelectedPagePart(props).type === SelectedPagePartType.Detail && getSelectedPagePart(props).action === SelectedPagePartAction.Editing;

  const [ draftTitle, setDraftTitle ] = useState(pageTitle);
  const [ draftSummary, setDraftSummary ] = useState(pageSummary);
  const [ draftProperties, setDraftProperties ] = useState(pageProperties);
  const [ draftDetails, setDraftDetails ] = useState(pageDetails);

  useEffect(() => {
    setDraftTitle(pageTitle);
    setDraftSummary(pageSummary);
  }, [pageTitle, pageSummary, editingPageOverview]);

  useEffect(() => {
    setDraftProperties(pageProperties);
  }, [pageProperties, editingPageOverview]);

  useEffect(() => {
    setDraftDetails(pageDetails);
  }, [pageDetails, editingPageOverview]);

  useEffect(() => {
    if (editingPageOverview) {
      PageState.draftTitle = pageTitle || '';
      PageState.draftSummary = pageSummary || '';
    }
  // eslint-disable-next-line
  }, [editingPageOverview]);

  useEffect(() => {
    if (editingProperties) {
      PageState.draftProperties = pageProperties || [];
    }
  // eslint-disable-next-line
  }, [editingProperties]);

  useEffect(() => {
    if (editingDetails) {
      PageState.draftDetails = pageDetails || [];
    }
  // eslint-disable-next-line
  }, [editingDetails]);


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

  const handleOnPropertyChange = (propertyIndex: number, newValue: string) => {
    PageState.draftProperties[propertyIndex].value = newValue;
    setDraftProperties(PageState.draftProperties);
  };

  const handleOnDetailChange = (detailIndex: number, newTitle: string, newSummary: string, newMarkdown: string) => {
    PageState.draftDetails[detailIndex].summary = newSummary;
    PageState.draftDetails[detailIndex].title = newTitle;
    PageState.draftDetails[detailIndex].markdown = newMarkdown;
    setDraftDetails(PageState.draftDetails);
  };

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
          editing={editingPageOverview}
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
          {draftProperties && draftProperties.map((property, index) => (
            <CastProperty
              key={property.key}
              propertyKey={property.key}
              value={property.value}
              editing={editingProperties}
              onPropertyChange={(newValue: string) => handleOnPropertyChange(index, newValue)} />
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
          {props.page && props.page.details.map((detail, index) => (
            <PageDetailSection
              key={detail.id}
              detail={detail}
              selectedPagePart={props.selectedPagePart}
              editing={editingDetails}
              onDetailChange={(newTitle: string, newSummary: string, newMarkdown: string) => handleOnDetailChange(index, newTitle, newSummary, newMarkdown)} />
          ))}
        </div>
      </CastSection>
    </CastPage>
  );
}

export default PageMain;
