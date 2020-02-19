export const LOCALE_NAME_ENGLISH = 'EN';

export const localeEn = {
  routes: {
    root: 'Spiderweb', // @CONTEXT: The official name of the product.
    pages: 'Pages',
  },
  page: {
    details: 'Details',
    properties: 'Properties',
    cancelSelection: 'Cancel Selection',
    editSelection: 'Edit Selection (E)',
    deleteSelection: 'Delete Selection (D)',
    jumpToSelection: 'Focus Selection (F)',
    viewPages: 'View Pages',
    createPage: 'Create Page',
    createPageSecondary: '⇧⌘N',
    edit: {
      pageTitle: 'Page Title',
      pageSummary: 'Page Summary',
      errorPageTitle: 'Must provide a title',
    },
    error: {
      fetchPage: 'Cannot retrieve the page.',
      savePage: 'Cannot save changes. Copy edited content to a safe place if retrying does not help.'
    }
  },
  default: {
    search: 'Search',
    home: 'Back to Home',
    save: 'Save',
    saveHotKeys: 'Save (⇧⌘S)',
    cancel: 'Cancel',
    cancelHotKeys: 'Cancel (Esc)',
    retry: 'Retry',
  },
};