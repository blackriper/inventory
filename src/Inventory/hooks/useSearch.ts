import { useProduct } from './../../context/productContext';
import { useRef } from "react";
import { getData } from '../../utilities';

export function useSearched() {
  const search = useRef<HTMLInputElement>(null);
  const{products,setproducts}=useProduct();

  
  const handleChange = () => {
    let searchText =search.current?.value??""
    if (searchText!='') setproducts(products.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase())));
    if(searchText==='') setproducts(JSON.parse(getData()));
    
  }
  return {search,products,handleChange}
}