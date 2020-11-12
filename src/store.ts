import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { productsReducer } from "./productsStore";
/* tslint:disable:interface-name */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}
/* tslint:enable:interface-name */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  productsReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
