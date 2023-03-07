import {useState } from 'react';
import { Container, Input, Heading, Button, Grid, useCheckboxGroup } from '@chakra-ui/react'
import { Products } from './components/Products';
import { AddIcon, EditIcon, DeleteIcon, CalendarIcon } from '@chakra-ui/icons';
import { useLocation } from "wouter";
import { useDialog } from '../components/Dialog/hooks/useDialog';
import { Deletedialog } from '../components/Dialog/Deletedialog';
import { useBreakpointValue } from '@chakra-ui/react';
import { Reqprod } from './components/Reqprod';
import { useSearched } from './hooks/useSearch';
import { useSelected } from './hooks/useSelected';

export function Inventory() {

  const{search,products,handleChange}=useSearched() 
  const{getCheckboxProps,value,view,setLocation,onclose,handleClick,handleReq}=useSelected()
  const {isOpen, onClose ,onOpen, handleDelete} = useDialog();
  const grid = useBreakpointValue({ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' });
  
  const handleDel = () => {
    if (value.length > 1) alert("Only delete one product for time");
    if (value.length == 0) alert("You need select one product");
    onOpen();
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
      <Deletedialog sku={value[0]} isOpen={isOpen} onClose={onClose} handleDelete={handleDelete}/>
      <Reqprod view={view} onClose={onclose} sku={value[0]}/>

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
