import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useToast
} from '@chakra-ui/react'
import { useRef, useState } from 'react';
import { useProduct } from '../../context/productContext';


export function Reqprod({view,setView,sku}) {

    const [cantr, setcantr] = useState(1);
    const cancelRef = useRef();
    const onClose = () => setView(false);
    const{getProducts,getProduct,restCant}=useProduct();
    const toast=useToast();

    const rest=async ()=>{
       const{cant}=getProduct(sku[0]);
       let can=cant-cantr;
       let newcant={
           sku,
           cant:can
       }
       await restCant(newcant);
       toast({
        title: 'Product req.',
        description: `${sku} product requsion sucessfully`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      await getProducts();
      onClose();
    }


    return (
        <>
            <AlertDialog
                isOpen={view}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Req Product
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <NumberInput
                                w="100%"
                                min={1}
                                max={10000}
                                focusBorderColor='yellow.400'
                                value={cantr}
                                onChange={(cantr) => setcantr(cantr)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='purple' onClick={rest} ml={3}>
                                Acept
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
