import {
  Table,
  Checkbox
} from '@chakra-ui/react';
import { Product } from '../../types';

interface Props {
  products: Product[];
  getCheckboxProps: any
}

export function Products({ products, getCheckboxProps }: Props) {
  return (
    <Table.Root size='sm' border='1px' boxShadow='sm' mb={48} striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Sku</Table.ColumnHeader>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Cant</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {products.map((product) => (
          <Table.Row key={product.sku}>
            <Table.Cell>
              <Checkbox.Root size='md' colorScheme='purple' {...getCheckboxProps({ value: product.sku })}>
                <Checkbox.Label>{product.sku}</Checkbox.Label>
              </Checkbox.Root>
            </Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.cant}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
