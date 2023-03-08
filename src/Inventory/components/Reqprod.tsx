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

interface Props{
    view: boolean;
    onClose(): void;
    sku:any;
}



export function Reqprod({view,onClose,sku}:Props) {

    const [cantr, setcantr] = useState<number>(1);
    const cancelRef = useRef<any>();
    const{getProduct,restCant}=useProduct();
    const toast=useToast();

    const rest=async ()=>{
       const{cant}=getProduct(sku);
       let can=cant-cantr;
       const status=await restCant(sku, can);
      if(status==200){
       toast({
        title: 'Product req.',
        description: `${sku} product requsion sucessfully`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
     
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
                                onChange={(cantr) => setcantr(parseInt(cantr,10))}>
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
