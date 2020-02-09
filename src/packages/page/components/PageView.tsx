import React from 'react';
import Button from '@material-ui/core/Button';
import documentTitleBuilder from '../../../utils/DocumentTitleBuilder';
import { Page } from '../entities/Page';
import pageService from '../services/PageService';
import logger from '../../../utils/Logger';

export interface PageViewProps { 
  pageId: string; 
}

interface PageState {
  page?: Page;
}

class PageView extends React.Component<PageViewProps, PageState> {
  constructor(props: PageViewProps) {
    super(props);
    this.state = {
      page: new Page(this.props.pageId, "test")
    };
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
    if (!this.state.page) {
      return (
        <div className="PageView">Loadings...</div>
      );
    }
    return (
      <div className="PageView">
        <h1>Page: {this.state.page.name}</h1>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

export default PageView;
