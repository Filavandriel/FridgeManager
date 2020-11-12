import produce from "immer";
import { ThunkAction } from "redux-thunk";

import { createNumericIdDistinctFromObjectKeys } from "utils/colletionUtils";
import * as productsAPI from "./productsAPI";
import { ProductType, ProductWithoutIdType } from "./productsTypes";

const FETCH = "products/FETCH";
const CREATE = "products/CREATE";
const UPDATE = "products/UPDATE";
const DELETE = "products/DELETE";

export type ProductsMapType = { [productId: number]: ProductType };

export type ProductsStateType = {
  allProducts: ProductsMapType;
};

export type FetchProductActionType = {
  type: typeof FETCH;
  products: ProductsMapType;
};

export type CreateProductActionType = {
  type: typeof CREATE;
  product: ProductType;
};

export type UpdateProductActionType = {
  type: typeof UPDATE;
  product: ProductType;
};

export type DeleteProductActionType = {
  type: typeof DELETE;
  id: number;
};

type ActionType =
  | FetchProductActionType
  | CreateProductActionType
  | UpdateProductActionType
  | DeleteProductActionType;

const initialState: ProductsStateType = {
  allProducts: {}
};

export function productsReducer(state = initialState, action: ActionType) {
  return produce(state, draft => {
    switch (action.type) {
      case FETCH:
        draft.allProducts = action.products;
        break;

      case CREATE:
        draft.allProducts[action.product.id] = action.product;
        break;

      case UPDATE:
        draft.allProducts[action.product.id] = action.product;
        break;

      case DELETE:
        delete draft.allProducts[action.id];
        break;
    }
  });
}

export function fetchProductsAction(): FetchProductActionType {
  const products = productsAPI
    .fetchProducts()
    .reduce((reduced: ProductsMapType, product) => {
      reduced[product.id] = product;
      return reduced;
    }, {});
  return { type: FETCH, products };
}

export function createProductAction(
  productWithoutId: ProductWithoutIdType
): ThunkAction<void, ProductsStateType, void, CreateProductActionType> {
  return (dispatch, getState) => {
    const { allProducts } = getState();

    const id = createNumericIdDistinctFromObjectKeys(allProducts);

    const product = {
      ...productWithoutId,
      id
    };

    dispatch({ type: CREATE, product });
  };
}

export function updateProductAction(
  product: ProductType
): UpdateProductActionType {
  return { type: UPDATE, product };
}

export function deleteProductAction(id: number): DeleteProductActionType {
  return { type: DELETE, id };
}
