import React, { ReactElement } from 'react';
import CastPageActions from '../../shared/components/CastPageActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import localizer from '../../../utils/Localizer';
import logger from '../../../utils/Logger';

export enum SelectedPagePartType {
  Overview = 'overview',
  Properties = 'properties',
  Detail = 'detail',
  Undefined = 'undefined',
}

export interface SelectedPagePart {
  type: SelectedPagePartType;
  elementId: string;
  id?: string;
}

export interface PageOptionsProps {
  selectedPagePart?: SelectedPagePart;
  onDeletePagePart?: () => void;
  onEditPagePart?: () => void;
  onCancelSelection?: () => void;
}

interface PageOptionsState {}

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


class PageOptions extends React.Component<PageOptionsProps, PageOptionsState> {
  constructor(props: PageOptionsProps) {
    super(props);
    this.state = {};
  }

  private get selectedPagePart():SelectedPagePart {
    if (!this.props.selectedPagePart) {
      return {
        type: SelectedPagePartType.Undefined,
        elementId: '',
      };
    }
    return this.props.selectedPagePart;
  }

  private handleOnActionSelect = (actionKey: string) => {
    if (actionKey === ActionKey.Delete && this.props.onDeletePagePart) {
      this.props.onDeletePagePart();
    } else if (actionKey === ActionKey.Cancel && this.props.onCancelSelection) {
      this.props.onCancelSelection();
    } else if (actionKey === ActionKey.Edit && this.props.onEditPagePart) {
      this.props.onEditPagePart();
    } else if (actionKey === ActionKey.JumpTo) {
      const id = this.selectedPagePart.elementId;
      const el = document.getElementById(id)
      if (!el) {
        logger.logError(new Error(`element at ${id} is not defined`));
        return;
      }
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  render():ReactElement {
    return (
      <div className="PageOptions">
        <CastPageActions
          hidden={!this.props.selectedPagePart}
          actions={actions}
          defaultActionKey={ActionKey.Edit}
          onActionSelect={this.handleOnActionSelect}></CastPageActions>
      </div>
    );
  }
}

export default PageOptions;
