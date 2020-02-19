import React, { ReactElement } from 'react';
import CastPageActions from '../../shared/components/CastPageActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import localizer from '../../../utils/Localizer';
import { PagePartElementId } from './PageMain';
import CastSaveOrCancelActions from '../../shared/components/CastSaveOrCancelActions';
import { DraftPage } from '../entities/DraftPage';

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
  editing?: boolean;
  deleting?: boolean;
  draftPage?: DraftPage;
}

export interface PageOptionsProps {
  disabledSave?: boolean;
  selectedPagePart?: SelectedPagePart;
  onDeletePagePart?: () => void;
  onEditPagePart?: () => void;
  onJumpToPagePart?: () => void;
  onCancelSelection?: () => void;
  onSelectionEditSave?: () => void;
  onSelectionEditCancel?: () => void;
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
        elementId: PagePartElementId.Undefined,
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
    } else if (actionKey === ActionKey.JumpTo && this.props.onJumpToPagePart) {
      this.props.onJumpToPagePart();
    }
  }

  render():ReactElement {
    return (
      <div className="PageOptions">
        {!this.selectedPagePart.editing && 
          <CastPageActions
            hidden={!this.props.selectedPagePart}
            actions={actions}
            defaultActionKey={ActionKey.Edit}
            onActionSelect={this.handleOnActionSelect}></CastPageActions>
        }
        { this.selectedPagePart.editing &&
          <CastSaveOrCancelActions
            disabledSave={this.props.disabledSave}
            onSave={this.props.onSelectionEditSave}
            onCancel={this.props.onSelectionEditCancel}></CastSaveOrCancelActions>
        }
      </div>
    );
  }
}

export default PageOptions;
