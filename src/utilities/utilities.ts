import { Product } from './../types/types';

 const KEY="Products"

export function getData(){
   const products:string|null= localStorage.getItem(KEY)
   return products??""
}

export function setData(products:Product[]){
  localStorage.setItem(KEY, JSON.stringify(products))
}

export function removeData(){
  localStorage.removeItem(KEY)
}