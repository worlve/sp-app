import React from 'react';
import documentTitleBuilder from '../../utils/DocumentTitleBuilder';
import { Page } from './entities/Page';
import pageService from './services/PageService';
import logger from '../../utils/Logger';
import PageHeader from './components/PageHeader';
import PageMain from './components/PageMain';
import PageOptions from './components/PageOptions';

export interface PageViewProps { 
  pageId: string; 
}

interface PageState {
  page?: Page;
}

class PageView extends React.Component<PageViewProps, PageState> {
  constructor(props: PageViewProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const callback = PageView.setDocumentTitle;

    this.setPage(callback);
  }

  private async setPage(callback?: (page: Page) => void) {
    try {
      const page = await pageService.fetchPage(this.props.pageId);
      if (callback) {
        callback(page);
      }
      this.setState({
        page
      });
    } catch(err) {
      logger.logError(err);
    }
  }

  private static setDocumentTitle(page: Page) {
    document.title = documentTitleBuilder.buildTitle([page.name]);
  }

  render() {
    return (
      <div className="PageView">
        <PageHeader page={this.state.page}></PageHeader>
        <PageMain page={this.state.page}></PageMain>
        <PageOptions></PageOptions>
      </div>
    );
  }
}

export default PageView;
