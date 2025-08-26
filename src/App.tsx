import { Route, Switch } from "wouter";
import { Inventory } from './Inventory/Inventory';
import { Actprod } from "./Inventory/components/Actprod";
import { Addprod } from "./Inventory/components/Addprod";
import { ProductContext } from "./context/productContext";
import { IconContext } from "react-icons";

export function App() {

  return (

    <IconContext.Provider value={{ color: "white" }}>
      <ProductContext>
        <Switch>
          <Route path="/" component={Inventory} />
          <Route path="/newproduct" component={Addprod} />
          <Route path="/actproduct/:id">
            {params => <Actprod sku={params.id} />}
          </Route>
        </Switch>
      </ProductContext>
    </IconContext.Provider>
  )
}


