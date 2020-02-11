import React from 'react';
import { Page } from '../entities/Page';
import CastPageContent from '../../shared/components/CastPageContent';
import CastProperty from '../../shared/components/CastProperty';
import PageDetailSection from './PageDetailSection';
import CastPage from '../../shared/components/CastPage';
import { TitleTag } from '../../shared/entities/TitleTag';
import CastSection from '../../shared/components/CastSection';

export interface PageMainProps {
  page?: Page;
}

const PageMain = (props: PageMainProps) => {
  return (
    <CastPage>
      <CastPageContent
        titleTag={TitleTag.Header1}
        title={props.page ? props.page.title : undefined}
        summary={props.page ? props.page.summary : undefined}>
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
            {props.page.details.map(detail => (
              <PageDetailSection key={detail.id} detail={detail} />
            ))}
          </CastSection>
        }
      </CastPageContent>
    </CastPage>
  );
}

export default PageMain;
