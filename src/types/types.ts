 export interface Product{
   sku: string;
   name:string;
   cant:number;
}

export interface ContextInventory{
  products:Product[];
  setproducts: React.Dispatch<React.SetStateAction<Product[]>>;
  deleteProduct:(sku:string)=>Promise<number>;
  getProduct:(sku:string)=>Product;
  restCant: (sku: string, cant: number) => Promise<number>;
  addProduct: (pr: InputProduct) => Promise<number>;
  updateProduct: (pr: InputProduct, sku: string) => Promise<number>
}

export interface InputProduct{
  name:string;
  cant:number;
}