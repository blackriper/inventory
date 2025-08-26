import {
  Button,
  NumberInput,
  Dialog,
  Portal
} from '@chakra-ui/react'
import { useRef, useState } from 'react';
import { toaster } from '../../components/ui/toaster';
import { useProduct } from '../../context/productContext';

interface Props {
  view: boolean;
  onClose(): void;
  sku: any;
}



export function Reqprod({ view, onClose, sku }: Props) {

  const [cantr, setcantr] = useState<number>(1);
  const cancelRef = useRef<any>();
  const { getProduct, restCant } = useProduct();

  const rest = async () => {
    const { cant } = getProduct(sku);
    let can = cant - cantr;
    const status = await restCant(sku, can);
    if (status == 200) {
      toaster.create({
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
      <Dialog.Root
        role="alertdialog"
        isOpen={view}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header fontSize='lg' fontWeight='bold'>
                Req Product
              </Dialog.Header>

              <Dialog.Body>
                <NumberInput.Root
                  w="100%"
                  min={1}
                  max={10000}
                  focusBorderColor='yellow.400'
                  value={cantr}
                  onChange={(cantr: string) => setcantr(parseInt(cantr, 10))}>
                  <NumberInput.Input />
                  <NumberInput.Control>
                    <NumberInput.IncrementTrigger />
                    <NumberInput.DecrementTrigger />
                  </NumberInput.Control>
                </NumberInput.Root>

              </Dialog.Body>

              <Dialog.Footer>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='purple' onClick={rest} ml={3}>
                  Accept
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
