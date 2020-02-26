import React, { ReactElement } from 'react';
import CastPageActions from '../../shared/components/CastPageActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import localizer from '../../../utils/Localizer';
import CastSaveOrCancelActions from '../../shared/components/CastSaveOrCancelActions';
import { SelectedPagePart, SelectedPagePartAction } from '../entities/SelectedPagePart';
import PageState from '../state/PageState';

export interface PageOptionsProps {
  disabledSave?: boolean;
  selectedPagePart: SelectedPagePart;
}

enum ActionKey {
  Edit = 'edit',
  JumpTo = 'jumpTo',
  Delete = 'delete',
  Cancel = 'cancel',
}

const actions = [
  { icon: <EditIcon />, tooltip: localizer.localeMap.page.editSelection, key: ActionKey.Edit },
  { icon: <VisibilityIcon />, tooltip: localizer.localeMap.page.jumpToSelection, key: ActionKey.JumpTo },
  { icon: <DeleteIcon />, tooltip: localizer.localeMap.page.deleteSelection, key: ActionKey.Delete },
];


const PageOptions = (props: PageOptionsProps):ReactElement => {
  const handleOnActionSelect = (actionKey: string) => {
    switch(actionKey) {
      case ActionKey.Delete:
        PageState.deletingSelectedPagePart();
        break;
      case ActionKey.Edit:
        PageState.editingSelectedPagePart();
        break;
      case ActionKey.JumpTo:
        PageState.jumpToSelectedPagePart();
        break;
      case ActionKey.Cancel:
        PageState.deselectPagePart();
    }
  };

  const handleSave = () => {
    PageState.saveSelectedPagePartChanges();
  };

  const handleCancel = () => {
    PageState.deselectPagePart();
  };

  return (
    <div className="PageOptions">
      {props.selectedPagePart.action !== SelectedPagePartAction.Editing && 
        <CastPageActions
          hidden={!props.selectedPagePart}
          actions={actions}
          defaultActionKey={ActionKey.Edit}
          onActionSelect={handleOnActionSelect}></CastPageActions>
      }
      {props.selectedPagePart.action === SelectedPagePartAction.Editing &&
        <CastSaveOrCancelActions
          disabledSave={props.disabledSave}
          onSave={handleSave}
          onCancel={handleCancel}></CastSaveOrCancelActions>
      }
    </div>
  )
};

export default PageOptions;
