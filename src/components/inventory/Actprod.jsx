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
import { useState } from "react";
import { useProduct } from "../../context/productContext";
import { useLocation } from "wouter";


export function Actprod({ id }) {
    const { getProduct,updateProduct,getProducts} = useProduct();
    const { name, cant } = getProduct(id);
    const [newcant, setnewcant] = useState(cant);
    const [newname, setnewname] = useState(name);
    const [location, setLocation] = useLocation();
    const toast = useToast();

    const handleClick=async ()=>{
        let newproduct = {
            sku:id,
            name:newname,
            cant:newcant
          }
        await updateProduct(newproduct);
        toast({
            title: 'Product update.',
            description: `${name} product updated`,
            status: 'info',
            duration: 2000,
            isClosable: true,
          });
          getProducts()
          setLocation("/")

    }

    return (
        <Center>
            <VStack w="40%" spacing={5}>
                <Heading size="lg" mt={8} color="blue.700">Update Product</Heading>
                <Input
                    placeholder='Product name'
                    value={newname}
                    focusBorderColor='yellow.400'
                    onChange={(e) => setnewname(e.target.value)} />
                <NumberInput
                    w="100%"
                    min={10}
                    max={10000}
                    focusBorderColor='yellow.400'
                    value={newcant}
                    onChange={(newcant) => setnewcant(newcant)}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
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
