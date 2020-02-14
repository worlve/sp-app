import React, { ReactElement } from 'react';
import { Page } from '../entities/Page';
import CastPageContent from '../../shared/components/CastPageContent';
import CastProperty from '../../shared/components/CastProperty';
import PageDetailSection from './PageDetailSection';
import CastPage from '../../shared/components/CastPage';
import { TitleTag } from '../../shared/entities/TitleTag';
import CastSection from '../../shared/components/CastSection';

export interface PageMainProps {
  page?: Page;
  onClickPageOverview?: () => void;
}

const PageMain = (props: PageMainProps):ReactElement => {
  return (
    <CastPage>
      <CastPageContent
        titleTag={TitleTag.Header1}
        title={props.page ? props.page.title : undefined}
        summary={props.page ? props.page.summary : undefined}
        onClickTitle={props.onClickPageOverview}
        onClickSummary={props.onClickPageOverview}>
        {props.page && props.page.properties.map(property => (
          <CastProperty
            key={property.key}
            propertyKey={property.key}
            value={property.value} />
        ))}
        {props.page && 
          <CastSection
            titleTag={TitleTag.Header2}
            title='!!Details'>
            {/* @TODO: PageDetailSection.CastAccordian.ExpansionPanel requires 
              an element with the class of 'root' surrounding it to display properly. */}
            <div className='root'>
              {props.page.details.map(detail => (
                <PageDetailSection key={detail.id} detail={detail} />
              ))}
            </div>
          </CastSection>
        }
      </CastPageContent>
    </CastPage>
  );
}

export default PageMain;
