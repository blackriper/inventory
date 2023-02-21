import { Route, Switch } from "wouter";
import {Inventory} from './components/Inventory';
import { Actprod } from "./components/inventory/Actprod";
import { Addprod } from "./components/inventory/Addprod";
import { ProductContext } from "./context/productContext";

export function App() {
 
  return (
   <ProductContext> 
    <Switch>
     <Route path="/" component={Inventory} />
     <Route path="/newproduct" component={Addprod}/>
     <Route path="/actproduct/:id">
       { params=> <Actprod id={params.id}/>}
     </Route>
    </Switch>
  </ProductContext>
  )
}


