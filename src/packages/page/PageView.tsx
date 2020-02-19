import React, { ReactElement } from 'react';
import documentTitleBuilder from '../../utils/DocumentTitleBuilder';
import { Page } from './entities/Page';
import pageService from './services/PageService';
import logger from '../../utils/Logger';
import PageHeader from './components/PageHeader';
import PageMain, { PagePartElementId } from './components/PageMain';
import PageOptions, { SelectedPagePartType, SelectedPagePart } from './components/PageOptions';
import hotKeyListener, { keyCodeMap } from '../../utils/HotKeyListener';
import { DraftPage } from './entities/DraftPage';

export interface PageViewProps { 
  pageId: string; 
}

interface PageState {
  page?: Page;
  selectedPagePart?: SelectedPagePart;
}

class PageView extends React.Component<PageViewProps, PageState> {
  private hotKeyCallbackNumbers: number[];

  constructor(props: PageViewProps) {
    super(props);
    this.state = {};
    this.hotKeyCallbackNumbers = [];
  }

  componentDidMount() {
    this.hotKeyCallbackNumbers.push(
      hotKeyListener.registerCallback(
        new Set([keyCodeMap.ESC]), 
        this.handleCancelSelection,
      )
    );
    this.hotKeyCallbackNumbers.push(
      hotKeyListener.registerCallback(
        new Set([keyCodeMap.E]), 
        this.handleEditPagePart,
      )
    );
    this.hotKeyCallbackNumbers.push(
      hotKeyListener.registerCallback(
        new Set([keyCodeMap.SHIFT, keyCodeMap.COMMAND, keyCodeMap.S]), 
        this.handleSaveEditPagePart,
      )
    );
    this.hotKeyCallbackNumbers.push(
      hotKeyListener.registerCallback(
        new Set([keyCodeMap.F]), 
        this.handleJumpToPagePart,
      )
    );
    const callback = PageView.setDocumentTitle;
    this.fetchPage(callback);
  }

  componentWillUnmount() {
    for (const callbackNumber of this.hotKeyCallbackNumbers) {
      hotKeyListener.unregisterCallback(callbackNumber);
    }
  }

  private async fetchPage(callback?: (page: Page) => void) {
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
      selectedPagePart: {
        ...this.selectedPagePart,
        deleting: true,
      }
    });
  }

  private handleEditPagePart = () => {
    if (!this.state.selectedPagePart) {
      logger.logInfo('handleEditPagePart called without selected page part.  Likely due to hotkey event');
      return;
    }
    if (!this.state.page) {
      logger.logError(new Error('edit called on a page that does not exist'));
      return;
    }
    const draftPage:DraftPage = {};
    switch (this.state.selectedPagePart.type) {
      case SelectedPagePartType.Overview:
        draftPage.title = this.state.page.title;
        draftPage.summary = this.state.page.summary;
        break;
      default:
        logger.logError(new Error(`unexpected edit on selected page part: ${this.state.selectedPagePart.type}`));
        return;
    }
    this.setState({
      selectedPagePart: {
        ...this.selectedPagePart,
        editing: true,
        draftPage,
      }
    });
  }

  private handleJumpToPagePart = () => {
    const id = this.selectedPagePart.elementId;
    const el = document.getElementById(id);
    if (!el) {
      logger.logError(new Error(`element at ${id} is not defined`));
      return;
    }
    el.scrollIntoView({
      behavior: 'smooth'
    });
  }

  private handleSaveEditPagePart = () => {
    if (!this.state.selectedPagePart || !this.state.selectedPagePart.draftPage) {
      logger.logInfo('handleSaveEditPagePart called without selected page part');
      return;
    }
    if (!this.state.page) {
      logger.logError(new Error('edit called on a page that does not exist'));
      return;
    }
    const page = this.state.page.copy();
    switch (this.state.selectedPagePart.type) {
      case SelectedPagePartType.Overview:
        page.title = this.state.selectedPagePart.draftPage.title || '';
        page.summary = this.state.selectedPagePart.draftPage.summary || '';
        this.setPageOverview(page.title, page.summary);
        break;
      default:
        logger.logError(new Error(`unexpected edit on selected page part: ${this.state.selectedPagePart.type}`));
        return;
    }
    this.setState({
      selectedPagePart: undefined,
      page,
    });
  }

  private async setPageOverview(title: string, summary: string) {
    try {
      await pageService.setPageOverview(this.props.pageId, title, summary);
    } catch(err) {
      logger.logError(err);
    }
  }


  private handleCancelSelection = () => {
    this.setState({
      selectedPagePart: undefined
    });
  }

  private handleOnEditPageOverviewChange = (newTitle?: string, newSummary?: string) => {
    let changes = {};
    if (newTitle !== undefined) {
      changes = {
        ...changes,
        title: newTitle
      };
    }
    if (newSummary !== undefined) {
      changes = {
        ...changes,
        summary: newSummary
      }
    }
    this.setState({
      selectedPagePart: {
        ...this.selectedPagePart,
        draftPage: {
          ...this.selectedPagePart.draftPage,
          ...changes,
        }
      }
    });
  }

  get selectedPagePart():SelectedPagePart {
    if (!this.state.selectedPagePart) {
      return {
        type: SelectedPagePartType.Undefined,
        elementId: PagePartElementId.Undefined,
      };
    }
    return this.state.selectedPagePart;
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
          selectedPagePart={this.state.selectedPagePart}
          onClickAwaySelectedPagePart={this.handleCancelSelection}
          onEditPageOverviewChange={this.handleOnEditPageOverviewChange}></PageMain>
        <PageOptions
          selectedPagePart={this.state.selectedPagePart}
          onDeletePagePart={this.handleDeletePagePart}
          onEditPagePart={this.handleEditPagePart}
          onJumpToPagePart={this.handleJumpToPagePart}
          onCancelSelection={this.handleCancelSelection}
          onSelectionEditCancel={this.handleCancelSelection}
          onSelectionEditSave={this.handleSaveEditPagePart}></PageOptions>
      </div>
    );
  }
}

export default PageView;
