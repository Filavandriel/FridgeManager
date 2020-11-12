import { ListItem, ListItemText } from "@material-ui/core";
import { draggableProductId } from "dndIds";
import * as React from "react";
import {
  ConnectDragSource,
  DragSource,
  DragSourceCollector,
  DragSourceSpec
} from "react-dnd";
import { ProductType } from "./productsTypes";

type OwnProps = {
  product: ProductType;
};

type DragProps = {
  connectDragSource: ConnectDragSource;
  isDragging: boolean;
};

type Props = DragProps & OwnProps;

const productSource: DragSourceSpec<OwnProps, OwnProps> = {
  beginDrag({ product }) {
    return { product };
  },
  endDrag({ product }) {
    console.log(`upuszczamy produkt ${product.name}`);
    return { product };
  }
};

const collect: DragSourceCollector<DragProps> = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

class DraggableProduct extends React.Component<Props> {
  render() {
    const { product, connectDragSource } = this.props;

    return connectDragSource(
      <div>
        <ListItem>
          <ListItemText primary={product.name} secondary={product.category} />
          {product.expirationDate.toLocaleDateString("en-GB")}
        </ListItem>
      </div>
    );
  }
}

export default DragSource(draggableProductId, productSource, collect)(
  DraggableProduct
);
