import React from 'react';
import { Page } from '../entities/Page';

export interface PageMainProps {
  page?: Page;
}

const PageMain = (props: PageMainProps) => {
  return (
    <div className="PageMain">
      PageMain: {props.page ? props.page.name : 'NA'}
    </div>
  );
}

export default PageMain;
