import React from 'react'
import Cover from "./components/Cover"
import Main from "./components/Main"
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './helpers/index'
const profile = () => {
  return (
    <div>
    <ChakraProvider theme={theme}>
    <Cover />
    <Main />
    </ChakraProvider>
    </div>
  )
}

export default profile

