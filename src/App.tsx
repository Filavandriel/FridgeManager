import * as React from "react";

import AddProductForm from "AddProductForm";
import ProductsTable from "ProductsTable";
import TrashIcon from "TrashIcon";

class App extends React.Component {
  render() {
    return (
      <div>
        <ProductsTable titleBackgroundColor={"grey"} />
        <AddProductForm />
        <TrashIcon />
      </div>
    );
  }
}

export default App;
