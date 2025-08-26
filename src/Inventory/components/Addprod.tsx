import {
  VStack,
  Heading,
  Input,
  Center,
  Button,
  NumberInput,
  StackSeparator,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useProduct } from '../../context/productContext';
import { useLocation } from "wouter";
import { useBreakpointValue } from '@chakra-ui/react';
import { toaster } from '../../components/ui/toaster';

export function Addprod() {

  const [name, setname] = useState("");
  const [cant, setcant] = useState(10);
  const { addProduct } = useProduct();
  const [location, setLocation] = useLocation();
  const size = useBreakpointValue({ base: '100%', md: '30%' })

  const handleClick = async () => {

    if (!name) alert("there are empty fields")

    let product = {
      name,
      cant
    }
    const status = await addProduct(product);
    if (status == 201) {
      toaster.create({
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
      <VStack w={size} separator={<StackSeparator />}>
        <Heading size="lg" mt={8} color="blue.700">New Product</Heading>
        <Input
          placeholder='Product name'
          css={{ "--focus-color": "colors.yellow.400" }}
          onChange={(e) => setname(e.target.value)} />
        <NumberInput.Root
          w="100%"
          min={10}
          max={10000}
          focusBorderColor='yellow.400'
          value={cant}
          onChange={(cant: string) => setcant(parseInt(cant, 10))}>
          <NumberInput.Input />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>
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
