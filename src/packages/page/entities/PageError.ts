export enum PageErrorType {
  FetchPage = 'fetchPage',
  SavePage = 'savePage',
}

export interface PageError {
  type: PageErrorType;
}