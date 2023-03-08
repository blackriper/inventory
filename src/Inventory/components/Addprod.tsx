import {
  VStack,
  Heading,
  Input,
  Center,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useProduct } from '../../context/productContext';
import { useLocation } from "wouter";
import { useBreakpointValue } from '@chakra-ui/react';
import { Product } from '../../types';

export function Addprod() {

  const [name, setname] = useState("");
  const [cant, setcant] = useState(10);
  const { addProduct} = useProduct();
  const [location, setLocation] = useLocation();
  const toast = useToast();
  const size = useBreakpointValue({ base: '100%', md: '30%' })

  const handleClick = async () => {

     if (!name) alert("there are empty fields") 

      let product = {
        name,
        cant
      }
      const status=await addProduct(product);
     if(status==201){ 
      toast({
        title: 'Product added.',
        description: `${name} product create`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setLocation("/")
    }
   
  }


  return (
    <Center>
      <VStack w={size} spacing={5}>
        <Heading size="lg" mt={8} color="blue.700">New Product</Heading>
        <Input
          placeholder='Product name'
          focusBorderColor='yellow.400'
          onChange={(e) => setname(e.target.value)} />
        <NumberInput
          w="100%"
          min={10}
          max={10000}
          focusBorderColor='yellow.400'
          value={cant}
          onChange={(cant) => setcant(parseInt(cant,10))}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button
          colorScheme='pink'
          variant='solid'
          onClick={handleClick}
        >
          Add product
        </Button>
      </VStack>
    </Center>
  );
}
