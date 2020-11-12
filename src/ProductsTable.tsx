import {
  createStyles,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import * as React from "react";
import { connect } from "react-redux";

import DraggableProduct from "DraggableProduct";

import {
  fetchProductsAction,
  ProductsMapType,
  ProductsStateType
} from "productsStore";

const styles = createStyles({
  container: {
    marginBottom: 15,
    maxWidth: 380
  },
  root: {
    maxHeight: 200,
    maxWidth: 360,
    overflow: "auto",
    position: "relative",
    width: "100%"
  },
  title: {
    paddingLeft: 10
  }
});

type Props = WithStyles<typeof styles> & {
  allProducts: ProductsMapType;
  fetchProducts: VoidFunction;
  titleBackgroundColor: string;
};

class ProductsTable extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { classes, titleBackgroundColor } = this.props;

    return (
      <Grid spacing={16} container={true} item={true} xs={12} md={6}>
        <div className={classes.container}>
          <div
            style={{ backgroundColor: titleBackgroundColor }}
            className={classes.title}
          >
            <Typography variant="h5">Products</Typography>
          </div>
          <List className={classes.root}>
            {Object.values(this.props.allProducts).map(product => (
              <DraggableProduct key={product.id} product={product} />
            ))}
          </List>
        </div>
      </Grid>
    );
  }
}

export default connect(
  (state: ProductsStateType) => ({
    allProducts: state.allProducts
  }),
  dispatch => ({
    fetchProducts: () => {
      dispatch(fetchProductsAction());
    }
  })
)(withStyles(styles)(ProductsTable));
