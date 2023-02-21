import { useRef,useState } from 'react';
import { Container, Input, Heading, Button, Grid, useCheckboxGroup } from '@chakra-ui/react'
import { Products } from './inventory/Products';
import { useProduct } from '../context/productContext';
import { AddIcon, EditIcon, DeleteIcon, CalendarIcon } from '@chakra-ui/icons';
import { useLocation } from "wouter";
import { useDialog } from '../hooks/useDialog';
import { Deletedialog } from './inventory/Deletedialog';
import { useBreakpointValue } from '@chakra-ui/react';
import { Reqprod } from './inventory/Reqprod';

export function Inventory() {

  const { products, setproducts, getProducts } = useProduct();

  const search = useRef(null);
  const [location, setLocation] = useLocation();
  const { value, getCheckboxProps } = useCheckboxGroup();
  const { onOpen, isOpen, onClose, handleDelete } = useDialog();
  const grid = useBreakpointValue({ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' });
  const [view, setView] = useState(false);

  const handleChange = () => {
    if (search.current.value) {
      setproducts(products.filter((product) => product.name.toLowerCase().includes(search.current.value.toLowerCase())))
    } else {
      getProducts();
    }
  }

  const handleClick = () => {
    if (value.length > 1) {
      alert("Only updated one product for time")
    } else if (value.length == 0) {
      alert("You need select one product")
    } else {
      setLocation(`/actproduct/${value}`);
    }
  }

  const handleDel = () => {
    if (value.length > 1) {
      alert("Only delete one product for time")
    } else if (value.length == 0) {
      alert("You need select one product")
    } else {
      onOpen();
    }
  }

  
  const handleReq = () => {
    if (value.length > 1) {
      alert("Only required one product for time")
    } else if (value.length == 0) {
      alert("You need select one product")
    } else {
       setView(true);
    }
  }
  

  return (
    <Container maxW='container.lg' centerContent mt={8} >
      <Heading size="2xl" mb={8} color="purple.700">Inventory</Heading>
      <Input
        variant='flushed'
        placeholder='search product...'
        ref={search}
        onChange={handleChange}
        mb={8} />

      <Products products={products} getCheckboxProps={getCheckboxProps} />
      <Deletedialog sku={value} isOpen={isOpen} onClose={onClose} handleDelete={handleDelete} />
      <Reqprod view={view} setView={setView} sku={value}/>

      <Grid templateColumns={grid} gap={6}>
        <Button
          leftIcon={<AddIcon />}
          colorScheme='cyan'
          variant='solid'
          onClick={() => setLocation("/newproduct")}
        >
          Add product
        </Button>

        <Button
          leftIcon={<EditIcon />}
          colorScheme='purple'
          variant='solid'
          onClick={handleClick}
        >
          Act product
        </Button>

        <Button
          leftIcon={<DeleteIcon />}
          colorScheme='red'
          variant='solid'
          onClick={handleDel}
        >
          Delete product
        </Button>

        <Button
          leftIcon={<CalendarIcon />}
          colorScheme='green'
          variant='solid'
          onClick={handleReq}
        >
          Req product
        </Button>

      </Grid>
    </Container>
  )
}
