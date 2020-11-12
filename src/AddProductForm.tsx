import * as React from "react";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import "react-datepicker/dist/react-datepicker.css";

import {
  createProductAction,
  CreateProductActionType,
  ProductsMapType,
  ProductsStateType
} from "./productsStore";
import { ProductWithoutIdType } from "./productsTypes";

type Props = {
  allProducts: ProductsMapType;
  addProduct: (productWithoutId: ProductWithoutIdType) => void;
};

class AddProductForm extends React.Component<Props, ProductWithoutIdType> {
  constructor(props: any) {
    super(props);

    this.state = {
      category: "",
      expirationDate: new Date(),
      name: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleCathegoryInputChange = this.handleCathegoryInputChange.bind(
      this
    );
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    this.props.addProduct(this.state);
  }

  handleNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: e.target.value });
  }

  handleCathegoryInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ category: e.target.value });
  }

  handleDatePickerChange(date: Date) {
    this.setState({
      expirationDate: date
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Name..."
          value={this.state.name}
          onChange={this.handleNameInputChange}
        />
        <input
          placeholder="Category..."
          value={this.state.category}
          onChange={this.handleCathegoryInputChange}
        />
        <DatePicker
          selected={this.state.expirationDate}
          onChange={this.handleDatePickerChange}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default connect(
  (state: ProductsStateType) => ({
    allProducts: state.allProducts
  }),
  (
    dispatch: ThunkDispatch<ProductsStateType, void, CreateProductActionType>
  ) => ({
    addProduct: (productWithoutId: ProductWithoutIdType) => {
      dispatch(createProductAction(productWithoutId));
    }
  })
)(AddProductForm);
