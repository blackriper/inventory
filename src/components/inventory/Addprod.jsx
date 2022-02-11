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

export function Addprod() {

  const [name, setname] = useState("");
  const [cant, setcant] = useState(10);
  const { addProduct, getProducts } = useProduct();
  const [location, setLocation] = useLocation();
  const toast = useToast();
  const size = useBreakpointValue({ base: '100%', md: '30%' })

  const handleClick = async () => {

    if (name) {

      let product = {
        name,
        cant
      }
      await addProduct(product);
      toast({
        title: 'Product added.',
        description: `${name} product create`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      getProducts()
      setLocation("/")
    } else {
      alert("there are empty fields")
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
          onChange={(cant) => setcant(cant)}>
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
