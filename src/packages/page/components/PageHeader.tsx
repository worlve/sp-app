import React from 'react';
import { Page } from '../entities/Page';
import CastAppBar from '../../shared/components/CastAppBar';

export interface PageHeaderProps {
  page?: Page;
}

const PageHeader = (props: PageHeaderProps) => {
  return (
    <div className="PageHeader">
      <CastAppBar title={props.page ? props.page.name : undefined}></CastAppBar>
    </div>
  );
}

export default PageHeader;
