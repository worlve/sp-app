import React, { ReactElement } from 'react';
import { Page } from '../entities/Page';
import CastPageOverview from '../../shared/components/CastPageOverview';
import CastProperty from '../../shared/components/CastProperty';
import PageDetailSection from './PageDetailSection';
import CastPage from '../../shared/components/CastPage';
import { TitleTag } from '../../shared/entities/TitleTag';
import CastSection from '../../shared/components/CastSection';
import localizer from '../../../utils/Localizer';

export interface PageMainProps {
  page?: Page;
  onClickPageOverview?: () => void;
  pageOverviewSelected?: boolean;
}

const PageMain = (props: PageMainProps):ReactElement => {
  return (
    <CastPage>
      <CastPageOverview
        titleTag={TitleTag.Header1}
        title={props.page ? props.page.title : undefined}
        summary={props.page ? props.page.summary : undefined}
        onClick={props.onClickPageOverview}
        highlight={props.pageOverviewSelected} />
      <CastSection
        titleTag={TitleTag.Header2}
        title={localizer.localeMap.page.properties}>
        {props.page && props.page.properties.map(property => (
          <CastProperty
            key={property.key}
            propertyKey={property.key}
            value={property.value} />
        ))}
      </CastSection>
      <CastSection
        titleTag={TitleTag.Header2}
        title={localizer.localeMap.page.details}>
        {/* @TODO: PageDetailSection.CastAccordian.ExpansionPanel requires 
          an element with the class of 'root' surrounding it to display properly. */}
        <div className='root'>
          {props.page && props.page.details.map(detail => (
            <PageDetailSection key={detail.id} detail={detail} />
          ))}
        </div>
      </CastSection>
    </CastPage>
  );
}

export default PageMain;
