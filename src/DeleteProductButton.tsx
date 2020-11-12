import { Button } from "@material-ui/core";
import { deleteProductAction } from "productsStore";
import * as React from "react";
import { connect } from "react-redux";

type OwnProps = {
  id: number;
};

type Props = OwnProps & {
  handleDeleteProductClick: VoidFunction;
};

export function DeleteProductButton({ handleDeleteProductClick }: Props) {
  return <Button onClick={handleDeleteProductClick}>Delete</Button>;
}

export default connect(
  null,
  (dispatch, ownProps: OwnProps) => ({
    handleDeleteProductClick: () => {
      dispatch(deleteProductAction(ownProps.id));
    }
  })
)(DeleteProductButton);
