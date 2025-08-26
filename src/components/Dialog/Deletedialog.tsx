import { useRef } from "react";
import {
  Button,
  Dialog,
  Portal
} from '@chakra-ui/react'


interface Props {
  sku: any
  isOpen: boolean;
  onClose(): void;
  handleDelete(sku: string): Promise<void>;
}

export function Deletedialog({ sku, isOpen, onClose, handleDelete }: Props) {
  const cancelRef = useRef<any>();
  return (
    <>
      <Dialog.Root
        role="alertdialog"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header fontSize='lg' fontWeight='bold'>
                Delete Product
              </Dialog.Header>

              <Dialog.Body>
                Are you sure delete? You can't undo this action afterwards.
              </Dialog.Body>

              <Dialog.Footer>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={() => handleDelete(sku)} ml={3}>
                  Delete
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
