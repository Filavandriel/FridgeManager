import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import { draggableProductId } from "dndIds";
import * as React from "react";
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetCollector,
  DropTargetSpec
} from "react-dnd";

const styles = createStyles({
  deleteHoverColor: {
    color: red[300]
  }
});

type DropTrashProps = {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
};
type Props = WithStyles<typeof styles> & DropTrashProps;

const trashTarget: DropTargetSpec<{}> = {
  drop(_, monitor) {
    console.log(monitor.getItem());
  }
};

const collect: DropTargetCollector<DropTrashProps> = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

class TrashIcon extends React.Component<Props> {
  render() {
    const { classes, connectDropTarget, isOver } = this.props;

    return connectDropTarget(
      <div>
        <DeleteIcon className={isOver ? classes.deleteHoverColor : ""} />
      </div>
    );
  }
}
export default DropTarget(draggableProductId, trashTarget, collect)(
  withStyles(styles)(TrashIcon)
);
