import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";


const productContext = createContext();

export const useProduct = () => {
    const context = useContext(productContext);
    if (!context) throw new Error("There is no product provider");
    return context;
}


export const ProductContext = ({ children }) => {
    const [products, setproducts] = useState([]);

    //loading products
    const getProducts = async () => {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setproducts(data)
    }

    useEffect(() => getProducts(), []);

    //actions products
    const addProduct = async (product) => await axios.post('http://localhost:5000/api/newproduct', product);

    const updateProduct = async (newproduct) => await axios.put('http://localhost:5000/api/updateproduct', newproduct);

    const deleteProduct = async (sku) => await axios.delete(`http://localhost:5000/api/deleteproduct/${sku}`);

    const restCant = async (newcant) => await axios.put("http://localhost:5000/api/restcant", newcant);

    const getProduct = (id) => {
        const product = products.filter((product) => product.sku === id);
        return product[0]
    }

    return (
        <productContext.Provider value={{
            products,
            setproducts,
            getProducts,
            getProduct,
            addProduct,
            updateProduct,
            deleteProduct,
            restCant

        }}>
            {children}
        </productContext.Provider>
    );
};