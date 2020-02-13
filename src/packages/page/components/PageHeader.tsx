import React, { ReactElement } from 'react';
import { Page } from '../entities/Page';
import CastAppBar from '../../shared/components/CastAppBar';
import CastDrawer from '../../shared/components/CastDrawer';

export interface PageHeaderProps {
  page?: Page;
}

const PageHeader = (props: PageHeaderProps):ReactElement => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <div className="PageHeader">
      <CastDrawer
        openDrawer={openDrawer}
        onDrawerOpenChange={(open: boolean) => setOpenDrawer(open)}></CastDrawer>
      <CastAppBar
        title={props.page ? props.page.title : undefined}
        onSelectMenu={() => setOpenDrawer(true)}></CastAppBar>
    </div>
  );
}

export default PageHeader;
