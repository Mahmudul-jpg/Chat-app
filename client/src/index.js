import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom';
import ChatProvider from './context/ChatProvider'
ReactDOM.render(



  <Router>

    <ChakraProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </ChakraProvider>

  </Router>
  ,

  document.getElementById('root')
);


