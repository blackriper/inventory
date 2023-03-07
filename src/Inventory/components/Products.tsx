import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox
 } from '@chakra-ui/react';
import { Product } from '../../types';

 interface Props{
  products:Product[];
  getCheckboxProps:any
 }

export  function Products({products,getCheckboxProps}:Props) {
   return (
    <Table variant="striped" size='sm' border='1px' boxShadow='sm' mb={48}>
     <Thead>
      <Tr>
       <Th>Sku</Th>
       <Th>Name</Th>
       <Th isNumeric>Cant</Th>
      </Tr>
    </Thead>
    <Tbody>
     {products.map((product)=>(
       <Tr key={product.sku}>
        <Td>
         <Checkbox size='md' colorScheme='purple' {...getCheckboxProps({value:product.sku})}>
          {product.sku}
         </Checkbox>
        </Td> 
        <Td>{product.name}</Td>
        <Td isNumeric>{product.cant}</Td>
       </Tr>
     ))}
    </Tbody>
    </Table>
  );
}
