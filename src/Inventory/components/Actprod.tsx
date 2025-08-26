import {
  VStack,
  Heading,
  Input,
  Center,
  Button,
  NumberInput,
  StackSeparator,
} from '@chakra-ui/react';
import { useState } from "react";
import { useProduct } from "../../context/productContext";
import { useLocation } from "wouter";
import { toaster } from '../../components/ui/toaster';
interface Props {
  sku: string;
}

export function Actprod({ sku }: Props) {
  const { getProduct, updateProduct } = useProduct();
  const { name, cant } = getProduct(sku);
  const [newcant, setnewcant] = useState(cant);
  const [newname, setnewname] = useState(name);
  const [location, setLocation] = useLocation();

  const handleClick = async () => {
    let newproduct = {
      name: newname,
      cant: newcant
    }
    const status = await updateProduct(newproduct, sku);
    if (status == 200) {
      toaster.create({
        title: 'Product update.',
        description: `${name} product updated`,
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
      setLocation("/")
    }

  }

  return (
    <Center>
      <VStack w="40%" separator={<StackSeparator />}>
        <Heading size="lg" mt={8} color="blue.700">Update Product</Heading>
        <Input
          placeholder='Product name'
          value={newname}
          css={{ "--focus-color": "colors.yellow.400" }}
          onChange={(e) => setnewname(e.target.value)}
        />
        <NumberInput.Root
          w="100%"
          min={10}
          max={10000}
          focusBorderColor='yellow.400'
          value={newcant}
          onChange={(newcant: string) => setnewcant(parseInt(newcant, 10))}>
          <NumberInput.Input />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>
        <Button
          colorScheme='orange'
          variant='solid'
          onClick={handleClick}
        >
          Act product
        </Button>
      </VStack>
    </Center>
  )
}
