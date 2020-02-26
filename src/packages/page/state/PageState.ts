import store from '../../../utils/store';
import logger from '../../../utils/Logger';
import pageService from '../services/PageService';
import * as Actions from './actions';
import { SelectedPagePartType, PagePartElementId, SelectedPagePartAction, SelectedPagePart } from '../entities/SelectedPagePart';
import { makeGetSelectedPagePart, makeGetPage } from './selectors';
import { OutputSelector } from 'reselect';
import { Page } from '../entities/Page';
import { PageErrorType } from '../entities/PageError';

export class PageState {
  private getSelectedPagePart: OutputSelector<any, SelectedPagePart | undefined, any>;
  private getPage: OutputSelector<any, Page | undefined, any>;
  draftTitle: string;
  draftSummary: string;

  constructor() {
    this.getSelectedPagePart = makeGetSelectedPagePart();
    this.getPage = makeGetPage();
    this.draftSummary = '';
    this.draftTitle = '';
  }

  async setPage(pageId: string) {
    try {
      store.dispatch(Actions.setPageLoading(true));
      store.dispatch(Actions.setPageError());
      store.dispatch(Actions.setPage());
      const page = await pageService.fetchPage(pageId);
      store.dispatch(Actions.setPage(page));
      store.dispatch(Actions.setPageLoading(false));
    } catch(err) {
      store.dispatch(Actions.setPageError(PageErrorType.FetchPage));
      store.dispatch(Actions.setPageLoading(false));
      logger.logError(err);
    }
  }

  async selectPagePart(type: SelectedPagePartType, elementId: string | PagePartElementId, id?: string) {
    store.dispatch(Actions.setSelectedPagePart({
      type,
      elementId,
      id,
    }));
  }

  async deselectPagePart() {
    store.dispatch(Actions.setSelectedPagePart());
  }

  async deletingSelectedPagePart() {
    await this.setSelectedPagePartAction(this.forceGetSelectedPagePart(), SelectedPagePartAction.Deleting);
  }

  async editingSelectedPagePart() {
    await this.setSelectedPagePartAction(this.forceGetSelectedPagePart(), SelectedPagePartAction.Editing);
  }

  private forceGetPage():Page {
    const state = store.getState();
    const page = this.getPage(state);
    if (!page) {
      const err = new Error(`page is undefined`)
      logger.logError(err);
      throw err;
    }
    return page;
  }

  private forceGetSelectedPagePart():SelectedPagePart {
    const state = store.getState();
    const selectedPagePart = this.getSelectedPagePart(state);
    if (!selectedPagePart) {
      const err = new Error(`selectedPagePart is undefined`)
      logger.logError(err);
      throw err;
    }
    return selectedPagePart;
  }

  private async setSelectedPagePartAction(selectedPagePart: SelectedPagePart, action: SelectedPagePartAction) {
    store.dispatch(Actions.setSelectedPagePart({
      ...selectedPagePart,
      action,
    }));
  }

  async jumpToSelectedPagePart() {
    const selectedPagePart = this.forceGetSelectedPagePart();
    const id = selectedPagePart.elementId;
    const el = document.getElementById(id);
    if (!el) {
      const err = new Error(`element at ${id} is not defined`);
      logger.logError(err);
      throw err;
    }
    el.scrollIntoView({
      behavior: 'smooth'
    });
  }

  async saveSelectedPagePartChanges() {
    const selectedPagePart = this.forceGetSelectedPagePart();
    switch (selectedPagePart.type) {
      case SelectedPagePartType.Overview:
        await this.setPageOverview(this.draftTitle, this.draftSummary);
        break;
      default:
        const err = new Error(`unexpected selectedPagePart type: ${selectedPagePart.type}`)
        logger.logError(err);
        throw err;
    }
  }

  private async setPageOverview(title: string, summary?: string) {
    const page = this.forceGetPage();
    try {
      store.dispatch(Actions.setPageLoading(true));
      store.dispatch(Actions.setPageError());
      await pageService.setPageOverview(page.id, title, summary || '');
      const newPage = page.copy();
      newPage.title = title;
      newPage.summary = summary || '';
      store.dispatch(Actions.setPage(newPage));
      store.dispatch(Actions.setPageLoading(false));
      await this.deselectPagePart();
    } catch(err) {
      store.dispatch(Actions.setPageError(PageErrorType.SavePage));
      store.dispatch(Actions.setPageLoading(false));
      logger.logError(err);
    }
  }

  async canSaveSelectedPagePart(canSave: boolean) {
    await this.setSelectedPagePartDisabledSaveState(this.forceGetSelectedPagePart(), !canSave);
  }

  private async setSelectedPagePartDisabledSaveState(selectedPagePart: SelectedPagePart, disableSave?: boolean) {
    store.dispatch(Actions.setSelectedPagePart({
      ...selectedPagePart,
      disableSave,
    }));
  }
}

export default new PageState();