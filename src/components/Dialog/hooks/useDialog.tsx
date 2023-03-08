import {useState} from 'react';
import { useProduct } from '../../../context/productContext';
import {useToast} from '@chakra-ui/react';

export function useDialog() {
   
  const [isOpen, setIsOpen] = useState(false);
  const{deleteProduct}=useProduct();
  const toast=useToast();
  

  const onClose=()=>setIsOpen(false);
  const onOpen=()=>setIsOpen(true);
  
  const handleDelete=async(sku:string)=>{
     const status=await deleteProduct(sku);
    if(status==200){ 
     toast({
        title: 'Product deleted.',
        description: `${sku} deleted sucessfully`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
     onClose();
     
  }
  



  return{
      isOpen,
      setIsOpen,
      onClose,
      onOpen,
      handleDelete
    }
}
