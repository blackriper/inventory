import React, { useState, createContext, useEffect, useContext } from "react";
import { deleteOneproduct, getProducts, newProduct, restProduct, updateOneproduct } from "../services";
import { ContextInventory, InputProduct, Product } from "../types";
import { getData, removeData, setData } from "../utilities";


const productContext = createContext<ContextInventory|null >(null);

export const useProduct = () => {
    const context = useContext(productContext);
    if (!context) throw new Error("There is no product provider");
    return context;
}

interface Props {
   children: React.ReactNode
}


export const ProductContext = ({ children }:Props) => {
     
    const [products, setproducts] = useState<Product[]>([]);
    
    const getproducts = async () =>{
         const data:Product[]=getData()==="" ?await getProducts():JSON.parse(getData());
         if(getData()==="") setData(data)
         setproducts(data)
    }
    useEffect(()=>{getproducts()},[])

    const deleteProduct =async(sku:string)=>{
        const status= await deleteOneproduct(sku);
        if(status==200){
            let prods=products.filter((product)=>product.sku!=sku);
            removeData()
            setData(prods)
            setproducts(prods)
        }
        return status
    }

    const getProduct = (sku: string) => products.filter((product)=>product.sku===sku)[0]

    const restCant=async (sku:string,cant:number)=>{
        const status= await restProduct(sku,cant);
        if(status==200){
            let product= products.map((p)=>{
                if(p.sku===sku) p.cant=cant;
                return p;
            })
            removeData()
            setData(product)
            setproducts(product)
        }
        return status 
    }

    const addProduct = async(pr:InputProduct) =>{
        const status= await newProduct(pr);
        if (status==201){
           removeData() 
           await getproducts()
       }
       return status
    }

    const updateProduct = async(pr:InputProduct,sku:string) =>{
        const status= await updateOneproduct(pr,sku);
        if (status==200){
           removeData() 
           await getproducts()
         }
       return status
    }
      
    return (
        <productContext.Provider value={{products,
                                         setproducts,
                                         deleteProduct,
                                         getProduct,
                                         restCant,
                                         addProduct,
                                         updateProduct}}>
            {children}
        </productContext.Provider>
    );
};