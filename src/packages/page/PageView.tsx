import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import documentTitleBuilder from '../../utils/DocumentTitleBuilder';
import { Page } from './entities/Page';
import pageService from './services/PageService';
import logger from '../../utils/Logger';
import PageHeader from './components/PageHeader';
import PageMain from './components/PageMain';
import { SelectedPagePartType, SelectedPagePart, PagePartElementId, SelectedPagePartAction } from './entities/SelectedPagePart';
import hotKeyListener, { keyCodeMap } from '../../utils/HotKeyListener';
import { DraftPageOverview } from './entities/DraftPageOverview';
import localizer from '../../utils/Localizer';
import CastError from '../shared/components/CastError';
import PageState from './state/PageState';
import { makeGetPage, makeGetPageError, makeGetPageLoading, makeGetSelectedPagePart } from './state/selectors';
import { PageError } from './entities/PageError';
import PageOptions from './components/PageOptions';

export interface PageViewProps { 
  pageId: string;
  page?: Page;
  loading?: boolean;
  pageError?: PageError;
  selectedPagePart?: SelectedPagePart;
}

interface PageViewState {
  disabledSave?: boolean;
}

class PageView extends React.Component<PageViewProps, PageViewState> {
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
    PageState.setPage(this.props.pageId);
  }

  componentWillUnmount() {
    for (const callbackNumber of this.hotKeyCallbackNumbers) {
      hotKeyListener.unregisterCallback(callbackNumber);
    }
  }

  private static setDocumentTitle(page: Page) {
    document.title = documentTitleBuilder.buildTitle([page.title]);
  }

  private handleClickPageOverview = () => {
    PageState.selectPagePart(SelectedPagePartType.Overview, PagePartElementId.PageOverview);
  }

  private handleClickProperties = () => {
    PageState.selectPagePart(SelectedPagePartType.Properties, PagePartElementId.Properties);
  }

  private handleClickDetail = (detailId: string) => {
    PageState.selectPagePart(SelectedPagePartType.Detail, detailId, detailId);
  }

  private handleDeletePagePart = () => {
    PageState.deletingSelectedPagePart();
  }

  private handleEditPagePart = () => {
    PageState.editingSelectedPagePart();
  }

  private handleJumpToPagePart = () => {
    PageState.jumpToSelectedPagePart();
  }

  private handleSaveEditPagePart = () => {
    switch (this.selectedPagePart.type) {
      case SelectedPagePartType.Overview:
        PageState.setPageOverview(draftPageOverview.title, draftPageOverview.summary);
      default:
        logger.logError(new Error(`unexpected edit on selected page part: ${this.selectedPagePart.type}`));
        return;
    }
  }

  private handleCancelSelection = () => {
    PageState.deselectPagePart();
  }

  private handleOnEditPageOverviewChange = (newTitle?: string, newSummary?: string) => {
    PageState.canSaveSelectedPagePart(!!newTitle);
  }

  private get selectedPagePart():SelectedPagePart {
    if (!this.props.selectedPagePart) {
      return {
        type: SelectedPagePartType.Undefined,
        elementId: PagePartElementId.Undefined,
      };
    }
    return this.props.selectedPagePart;
  }

  private getErrorHtml():ReactElement {
    const errorRetryCallback = () => {
      PageState.setPage(this.props.pageId);
    };
    const errorMessage = localizer.localeMap.page.error.fetchPage;
    return <CastError message={errorMessage} onRetry={errorRetryCallback}></CastError>;
  }

  render():ReactElement {
    if (!this.props.page) {
      return <div className="PageView"></div>
    }
    PageView.setDocumentTitle(this.props.page);
    return (
      <div className="PageView">
        <PageHeader page={this.props.page}></PageHeader>
        <PageMain
          page={this.props.page}
          selectedPagePart={this.selectedPagePart}></PageMain>
        {!this.props.pageError && <PageOptions
          disabledSave={this.props.selectedPagePart?.disableSave}
          selectedPagePart={this.selectedPagePart}></PageOptions>
        }
        {this.props.pageError && this.getErrorHtml()}
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const getPage = makeGetPage();
  const getPageError = makeGetPageError();
  const getPageLoading = makeGetPageLoading();
  const getSelectedPagePart = makeGetSelectedPagePart();
  const mapStateToProps = (state: any) => {
    return {
      page: getPage(state),
      pageError: getPageError(state),
      loading: getPageLoading(state),
      selectedPagePart: getSelectedPagePart(state),
    };
  }
  return mapStateToProps;
}

export default connect(
  makeMapStateToProps,
)(PageView);
