export enum PagePartElementId {
  PageOverview = 'pageOverview',
  Properties = 'pageProperties',
  Undefined = 'undefined',
}

export enum SelectedPagePartType {
  Overview = 'overview',
  Properties = 'properties',
  Detail = 'detail',
  Undefined = 'undefined',
}

export enum SelectedPagePartAction {
  Editing = 'editing',
  Deleting = 'deleting',
}

export interface SelectedPagePart {
  type: SelectedPagePartType;
  elementId: string | PagePartElementId;
  id?: string;
  action?: SelectedPagePartAction;
  disableSave?: boolean;
}

export const getSelectedPagePart = ({ selectedPagePart}: {selectedPagePart?: SelectedPagePart}):SelectedPagePart => {
  if (!selectedPagePart) {
    return {
      type: SelectedPagePartType.Undefined,
      elementId: PagePartElementId.Undefined,
    };
  }
  return selectedPagePart;
}
