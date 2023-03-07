import { useRef} from "react";
import { useDialog } from "./hooks/useDialog";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react'


interface Props {
  sku: any
  isOpen: boolean;
  onClose(): void;
  handleDelete(sku:string):Promise<void>;
}

export function Deletedialog({sku,isOpen,onClose,handleDelete}:Props) {
    const cancelRef = useRef<any>();  
    return (
        <>
            <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Delete Product
                </AlertDialogHeader>
    
                <AlertDialogBody>
                  Are you sure delete? You can't undo this action afterwards.
                </AlertDialogBody>
    
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme='red' onClick={()=>handleDelete(sku)} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )
}
