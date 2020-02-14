import React, { ReactElement } from 'react';
import CastPageActions from '../../shared/components/CastPageActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import localizer from '../../../utils/Localizer';
import logger from '../../../utils/Logger';

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
  { icon: <EditIcon />, tooltip: localizer.localeMap.page.editSelection, key: '!!edit' },
  { icon: <VisibilityIcon />, tooltip: localizer.localeMap.page.jumpToSelection, key: '!!jumpTo' },
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
    } else if (actionKey === '!!jumpTo') {
      const id = 'test';
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
          defaultActionKey={'!!edit'}
          onActionSelect={this.handleOnActionSelect}></CastPageActions>
      </div>
    );
  }
}

export default PageOptions;
