import { indigo, lightBlue, red } from "@material-ui/core/colors";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import store from "./store";

const theme = createMuiTheme({
  palette: {
    error: red,
    primary: indigo,
    secondary: lightBlue
  },
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <DragDropContextProvider backend={HTML5Backend}>
        <App />
      </DragDropContextProvider>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
