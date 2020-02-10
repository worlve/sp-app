import React from 'react';
import CastPageActions from '../../shared/components/CastPageActions';

export interface PageOptionsProps {}

const PageOptions = (props: PageOptionsProps) => {
  return (
    <div className="PageOptions">
      <CastPageActions></CastPageActions>
    </div>
  );
}

export default PageOptions;
