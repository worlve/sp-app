import React, { ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import documentTitleBuilder from '../../utils/DocumentTitleBuilder';
import { Page } from './entities/Page';
import PageHeader from './components/PageHeader';
import PageMain from './components/PageMain';
import { SelectedPagePart, SelectedPagePartAction } from './entities/SelectedPagePart';
import hotKeyListener, { keyCodeMap } from '../../utils/HotKeyListener';
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

const hotKeyCallbackNumbers: number[] = [];
const singleCharacterHotKeyCallbackNumbers: number[] = [];

const PageView: React.FunctionComponent<PageViewProps> = (props) => {
  const pageTitle = props.page?.title;
  const selectedPagePartAction = props.selectedPagePart?.action;

  useEffect(() => {
    PageState.setPage(props.pageId);
  }, [props.pageId]);

  useEffect(() => {
    setDocumentTitle(pageTitle || '');
  }, [pageTitle]);

  useEffect(() => {
    hotKeyCallbackNumbers.push(
      hotKeyListener.registerCallback(
        new Set([keyCodeMap.ESC]),
        handleCancelSelection,
      )
    );
    hotKeyCallbackNumbers.push(
      hotKeyListener.registerCallback(
        new Set([keyCodeMap.E]),
        handleEditPagePart,
      )
    );
    addLastCallbackNumber(singleCharacterHotKeyCallbackNumbers);
    hotKeyCallbackNumbers.push(
      hotKeyListener.registerCallback(
        new Set([keyCodeMap.SHIFT, keyCodeMap.COMMAND, keyCodeMap.S]), 
        handleSavePagePartChanges,
      )
    );
    hotKeyCallbackNumbers.push(
      hotKeyListener.registerCallback(
        new Set([keyCodeMap.F]), 
        handleJumpToPagePart,
      )
    );
    addLastCallbackNumber(singleCharacterHotKeyCallbackNumbers);
    hotKeyCallbackNumbers.push(
      hotKeyListener.registerCallback(
        new Set([keyCodeMap.D]), 
        handleDeletePagePart,
      )
    );
    addLastCallbackNumber(singleCharacterHotKeyCallbackNumbers);
    return function cleanup() {
      for (const callbackNumber of hotKeyCallbackNumbers) {
        hotKeyListener.unregisterCallback(callbackNumber);
      }
    };
  }, []);

  useEffect(() => {
    let preventTrigger = false;
    if (selectedPagePartAction === SelectedPagePartAction.Editing) {
      preventTrigger = true;
    }
    toggleSingleCharacterHotkeys(preventTrigger);
  }, [selectedPagePartAction]);

  const addLastCallbackNumber = (addToList: number[]) => {
    addToList.push(hotKeyCallbackNumbers[hotKeyCallbackNumbers.length - 1]);
  }

  const toggleSingleCharacterHotkeys = (preventTrigger: boolean) => {
    for (const callbackNumber of singleCharacterHotKeyCallbackNumbers) {
      hotKeyListener.preventCallbackTrigger(callbackNumber, preventTrigger);
    }
  }

  const setDocumentTitle = (pageTitle: string) => {
    document.title = documentTitleBuilder.buildTitle([pageTitle]);
  }

  const handleDeletePagePart = () => {
    debugger;
    PageState.deletingSelectedPagePart();
  }

  const handleEditPagePart = () => {
    PageState.editingSelectedPagePart();
  }

  const handleJumpToPagePart = () => {
    PageState.jumpToSelectedPagePart();
  }

  const handleSavePagePartChanges = () => {
    PageState.saveSelectedPagePartChanges();
  }

  const handleCancelSelection = () => {
    PageState.deselectPagePart();
  }

  const getErrorHtml = ():ReactElement => {
    const errorRetryCallback = () => {
      PageState.setPage(props.pageId);
    };
    const errorMessage = localizer.localeMap.page.error.fetchPage;
    return <CastError message={errorMessage} onRetry={errorRetryCallback}></CastError>;
  }

  return (
    <div className="PageView">
      <PageHeader page={props.page}></PageHeader>
      <PageMain
        page={props.page}
        selectedPagePart={props.selectedPagePart}></PageMain>
      {!props.pageError && <PageOptions
        disabledSave={props.selectedPagePart?.disableSave}
        selectedPagePart={props.selectedPagePart}></PageOptions>
      }
      {props.pageError && getErrorHtml()}
    </div>
  );
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
