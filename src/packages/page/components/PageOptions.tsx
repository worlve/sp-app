import React, { ReactElement } from 'react';
import CastPageActions from '../../shared/components/CastPageActions';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import localizer from '../../../utils/Localizer';

export enum SelectedPagePartType {
  Overview = 'overview',
}

export interface SelectedPagePart {
  type: SelectedPagePartType;
  id?: string;
}

export interface PageOptionsProps {
  selectedPagePart?: SelectedPagePart;
  onDeletePagePart?: () => void;
  onEditPagePart?: () => void;
  onCancelSelection?: () => void;
}

interface PageOptionsState {}

const actions = [
  { icon: <CloseOutlinedIcon />, tooltip: localizer.localeMap.page.cancelSelection, key: '!!cancel' },
  { icon: <DeleteIcon />, tooltip: localizer.localeMap.page.deleteSelection, key: '!!delete' },
];


class PageOptions extends React.Component<PageOptionsProps, PageOptionsState> {
  constructor(props: PageOptionsProps) {
    super(props);
    this.state = {};
  }

  private handleOnActionSelect = (actionKey: string) => {
    if (actionKey === '!!delete' && this.props.onDeletePagePart) {
      this.props.onDeletePagePart();
    } else if (actionKey === '!!cancel' && this.props.onCancelSelection) {
      this.props.onCancelSelection();
    } else if (actionKey === '!!edit' && this.props.onEditPagePart) {
      this.props.onEditPagePart();
    }
  }

  render():ReactElement {
    return (
      <div className="PageOptions">
        <CastPageActions
          hidden={!this.props.selectedPagePart}
          actions={actions}
          defaultActionKey={'!!edit'}
          onActionSelect={this.handleOnActionSelect}></CastPageActions>
      </div>
    );
  }
}

export default PageOptions;
