import { useCheckboxGroup } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useDialog } from "../../components/Dialog/hooks/useDialog";

export function useSelected(){

  const [location, setLocation] = useLocation();
  const { value, getCheckboxProps } = useCheckboxGroup();
  const { onOpen} = useDialog();
  const [view, setView] = useState(false);
 
  const onclose = () => setView(false);

  const handleClick = () => {
    if (value.length > 1) alert("Only updated one product for time");
    if (value.length == 0) alert("You need select one product");
    if (value.length == 1) setLocation(`/actproduct/${value}`);
    
  }

   
  const handleReq = () => {
    if (value.length > 1) alert("Only required one product for time");
    if (value.length === 0) alert("You need select one product");
    if (value.length == 1) setView(true);
    
  }

  return{
    setLocation,
    getCheckboxProps,
    value,
    view,
    onclose,
    handleClick,
    handleReq
  }

}