import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { App } from './App'

const root = createRoot(document.getElementById('root')!)



root.render(

  <ChakraProvider value={defaultSystem}>
    <App />
  </ChakraProvider >
)
