import {useState} from 'react';
import { useProduct } from '../context/productContext';
import {useToast} from '@chakra-ui/react';

export function useDialog() {
   
  const [isOpen, setIsOpen] = useState(false);
  const{getProducts,deleteProduct}=useProduct();
  const toast=useToast();
  

  const onClose=()=>setIsOpen(false);
  const onOpen=()=>setIsOpen(true);
  
  const handleDelete=async(sku)=>{
     await deleteProduct(sku);
     toast({
        title: 'Product deleted.',
        description: `${sku} deleted sucessfully`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
     onClose();
     await getProducts(); 
  }
  



  return{
      isOpen,
      setIsOpen,
      onClose,
      onOpen,
      handleDelete
    }
}
