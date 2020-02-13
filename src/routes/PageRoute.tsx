import React, { ReactElement } from 'react';
import PageView from '../packages/page/PageView';
import PagesView from '../packages/page/PagesView';
import { useParams } from 'react-router-dom';

const PageRoute = ():ReactElement => {
  const { pageId } = useParams();
  if (!pageId) {
    return (
      <PagesView></PagesView>
    );
  }
  return (
    <PageView pageId={pageId}></PageView>
  );
}

export default PageRoute;
