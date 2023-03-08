import { InputProduct, Product } from './../types/types';
import axios from "axios";

//request interfacea

interface ProductResponse{
  body:Product[]
}

const conexion =  axios.create({
  baseURL:'http://localhost:8000/inventory/',
  timeout:1000,
  headers:{'Accept':'application/json'}
})


export const getProducts= async() =>{
   const{data}= await conexion.get<ProductResponse>('products')
   return data.body
}

export const deleteOneproduct= async(sku:string) =>{
   const status=await conexion.delete(`deleteproduct/${sku}`).then(data =>data.status)
   return status
}

export const restProduct= async(sku:string,cant:number) =>{
  const status=await conexion.put(`restcant/${sku}`,{cant}).then(data =>data.status)
  return status
}
export const newProduct=async(p:InputProduct)=>{
  const status = await conexion.post("newproduct",p).then(data =>data.status)
  return status
}

export const updateOneproduct=async(p:InputProduct,sku:string)=>{
  const status = await conexion.put(`updateproduct/${sku}`,p).then(data =>data.status)
  return status
}