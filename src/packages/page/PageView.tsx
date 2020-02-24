import React, { ReactElement } from 'react';
import documentTitleBuilder from '../../utils/DocumentTitleBuilder';
import { Page } from './entities/Page';
import pageService from './services/PageService';
import logger from '../../utils/Logger';
import PageHeader from './components/PageHeader';
import PageMain, { PagePartElementId } from './components/PageMain';
import PageOptions, { SelectedPagePartType, SelectedPagePart } from './components/PageOptions';
import hotKeyListener, { keyCodeMap } from '../../utils/HotKeyListener';
import { DraftPageOverview } from './entities/DraftPageOverview';
import localizer from '../../utils/Localizer';
import CastError from '../shared/components/CastError';

export interface PageViewProps { 
  pageId: string; 
}

interface PageState {
  page?: Page;
  selectedPagePart?: SelectedPagePart;
  errorRetryCallback?: () => void;
  errorMessage?: string;
  disabledSave?: boolean;
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
      this.clearError();
      this.setState({
        page
      });
    } catch(err) {
      logger.logError(err);
      this.setState({
        errorRetryCallback: () => {
          this.fetchPage(callback);
        },
        errorMessage: localizer.localeMap.page.error.fetchPage,
      });
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
    const draftPageOverview:DraftPageOverview = {};
    switch (this.state.selectedPagePart.type) {
      case SelectedPagePartType.Overview:
        draftPageOverview.title = this.state.page.title;
        draftPageOverview.summary = this.state.page.summary;
        break;
      case SelectedPagePartType.Detail:
        
      default:
        logger.logError(new Error(`unexpected edit on selected page part: ${this.state.selectedPagePart.type}`));
        return;
    }
    this.setState({
      selectedPagePart: {
        ...this.selectedPagePart,
        editing: true,
        draftPageOverview,
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
    if (!this.state.selectedPagePart || !this.state.selectedPagePart.draftPageOverview) {
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
        page.title = this.state.selectedPagePart.draftPageOverview.title || '';
        page.summary = this.state.selectedPagePart.draftPageOverview.summary || '';
        return this.setPageOverview(page);
      default:
        logger.logError(new Error(`unexpected edit on selected page part: ${this.state.selectedPagePart.type}`));
        return;
    }
  }

  private clearError() {
    this.setState({
      errorRetryCallback: undefined,
      errorMessage: undefined,
    });
  }

  private async setPageOverview(page: Page) {
    try {
      await pageService.setPageOverview(this.props.pageId, page.title, page.summary);
      this.clearError();
      this.setState({
        selectedPagePart: undefined,
        page,
      });
    } catch(err) {
      logger.logError(err);
      this.setState({
        errorRetryCallback: this.handleSaveEditPagePart,
        errorMessage: localizer.localeMap.page.error.savePage,
      });
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
      disabledSave: newTitle !== undefined && !newTitle,
    });
    this.setState({
      selectedPagePart: {
        ...this.selectedPagePart,
        draftPageOverview: {
          ...this.selectedPagePart.draftPageOverview,
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
        {!this.state.errorMessage &&<PageOptions
          disabledSave={this.state.disabledSave}
          selectedPagePart={this.state.selectedPagePart}
          onDeletePagePart={this.handleDeletePagePart}
          onEditPagePart={this.handleEditPagePart}
          onJumpToPagePart={this.handleJumpToPagePart}
          onCancelSelection={this.handleCancelSelection}
          onSelectionEditCancel={this.handleCancelSelection}
          onSelectionEditSave={this.handleSaveEditPagePart}></PageOptions>
        }
        {this.state.errorMessage && <CastError
          message={this.state.errorMessage}
          onRetry={this.state.errorRetryCallback}></CastError>
        }
      </div>
    );
  }
}

export default PageView;
