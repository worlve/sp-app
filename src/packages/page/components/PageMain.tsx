import React, { ReactElement } from 'react';
import { Page } from '../entities/Page';
import CastPageOverview from '../../shared/components/CastPageOverview';
import CastProperty from '../../shared/components/CastProperty';
import PageDetailSection from './PageDetailSection';
import CastPage from '../../shared/components/CastPage';
import { TitleTag } from '../../shared/entities/TitleTag';
import CastSection from '../../shared/components/CastSection';
import CastHighlightWrapper from '../../shared/components/CastHighlightWrapper';
import localizer from '../../../utils/Localizer';
import { SelectedPagePart, SelectedPagePartType } from './PageOptions';

export interface PageMainProps {
  page?: Page;
  selectedPagePart?: SelectedPagePart;
  onClickPageOverview?: () => void;
  onClickProperties?: () => void;
  onClickDetail?: (detailId: string) => void;
  onClickAwaySelectedPagePart?: () => void;
}

export enum PagePartElementId {
  PageOverview = 'pageOverview',
  Properties = 'pageProperties',
  Undefined = 'undefined',
}

const PageMain = (props: PageMainProps):ReactElement => {
  const selectedPagePart = ():SelectedPagePart => {
    if (!props.selectedPagePart) {
      return {
        type: SelectedPagePartType.Undefined,
        elementId: PagePartElementId.Undefined,
      };
    }
    return props.selectedPagePart;
  }

  const handleOnClickDetail = (detailId: string):void => {
    if (!props.onClickDetail) {
      return;
    }
    props.onClickDetail(detailId);
  }

  return (
    <CastPage>
      <CastHighlightWrapper
        onClick={props.onClickPageOverview}
        highlight={selectedPagePart().type === SelectedPagePartType.Overview}
        anchorId={PagePartElementId.PageOverview}
        disableHover={selectedPagePart().editing}>
        <CastPageOverview
          titleTag={TitleTag.Header1}
          title={props.page ? props.page.title : undefined}
          summary={props.page ? props.page.summary : undefined}
          editing={selectedPagePart().type === SelectedPagePartType.Overview && selectedPagePart().editing} />
      </CastHighlightWrapper>
      <CastSection
        titleTag={TitleTag.Header2}
        title={localizer.localeMap.page.properties}>
        <CastHighlightWrapper
          onClick={props.onClickProperties}
          highlight={selectedPagePart().type === SelectedPagePartType.Properties}
          anchorId={PagePartElementId.Properties}
          disableHover={selectedPagePart().editing}>
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
              detail={detail}
              onClickDetail={() => handleOnClickDetail(detail.id)}
              onClickAwayDetail={props.onClickAwaySelectedPagePart}
              highlight={props.selectedPagePart && props.selectedPagePart.id === detail.id} />
          ))}
        </div>
      </CastSection>
    </CastPage>
  );
}

export default PageMain;
