import './App.css';
import {Route, Routes} from 'react-router-dom';
import { LoginPage } from "./components/pages/Login";
import {LogbookPage} from "./components/pages/LogbookPage";
import {ChakraProvider} from '@chakra-ui/react'
import React from "react";
function App() {
  return (
  <ChakraProvider>
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
