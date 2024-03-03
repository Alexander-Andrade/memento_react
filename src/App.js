import './App.css';
import {Route, Routes} from 'react-router-dom';
import { LoginPage } from "./components/pages/Login";
import {LogbookPage} from "./components/pages/LogbookPage";
import {ChakraProvider} from '@chakra-ui/react'
import theme from "./Theme"
import React from "react";

function App() {
  return (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/" exact element={<LogbookPage />} />
      {/*<Route path="/bookmarks/:bookmarkId" element={<LogbookPage />} />*/}
      {/*<Route path="/bookmarks/:bookmarkId/topics/:topicId" element={<LogbookPage />} />*/}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </ChakraProvider>
  );
}

export default App;
