import React, { ReactElement } from 'react';
import documentTitleBuilder from '../../utils/DocumentTitleBuilder';
import { Page } from './entities/Page';
import pageService from './services/PageService';
import logger from '../../utils/Logger';
import PageHeader from './components/PageHeader';
import PageMain, { PagePartElementId } from './components/PageMain';
import PageOptions, { SelectedPagePartType, SelectedPagePart } from './components/PageOptions';

export interface PageViewProps { 
  pageId: string; 
}

interface PageState {
  page?: Page;
  selectedPagePart?: SelectedPagePart;
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
    document.title = documentTitleBuilder.buildTitle([page.title]);
  }

  private handleClickPageOverview = () => {
    this.setState({
      selectedPagePart: {
        type: SelectedPagePartType.Overview,
        elementId: PagePartElementId.PageOverview,
      },
    });
  }

  private handleClickProperties = () => {
    this.setState({
      selectedPagePart: {
        type: SelectedPagePartType.Properties,
        elementId: PagePartElementId.Properties,
      },
    });
  }

  private handleClickDetail = (detailId: string) => {
    this.setState({
      selectedPagePart: {
        type: SelectedPagePartType.Detail,
        elementId: detailId,
        id: detailId,
      },
    });
  }

  private handleDeletePagePart = () => {
    this.setState({
      selectedPagePart: undefined
    });
  }

  private handleEditPagePart = () => {
    debugger;
    this.setState({
      selectedPagePart: undefined
    });
  }

  private handleCancelSelection = () => {
    this.setState({
      selectedPagePart: undefined
    });
  }

  render():ReactElement {
    return (
      <div className="PageView">
        <PageHeader page={this.state.page}></PageHeader>
        <PageMain
          page={this.state.page}
          onClickPageOverview={this.handleClickPageOverview}
          onClickProperties={this.handleClickProperties}
          onClickDetail={this.handleClickDetail}
          selectedPagePart={this.state.selectedPagePart}></PageMain>
        <PageOptions
          selectedPagePart={this.state.selectedPagePart}
          onDeletePagePart={this.handleDeletePagePart}
          onEditPagePart={this.handleEditPagePart}
          onCancelSelection={this.handleCancelSelection}></PageOptions>
      </div>
    );
  }
}

export default PageView;
