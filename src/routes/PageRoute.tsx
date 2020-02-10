import React from 'react';
import PageView from '../packages/page/components/PageView';
import PagesView from '../packages/page/components/PagesView';
import { useParams } from 'react-router-dom';

const PageRoute = () => {
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
