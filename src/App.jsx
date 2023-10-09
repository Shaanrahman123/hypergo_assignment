import React, { useState } from 'react';
import Header from './Component/Header';
import Home from './Component/Home';
import { createContext } from 'react';


export const context = createContext();


const App = () => {
  const [Data, setData] = useState([]);
  return (
    <context.Provider value={{ Data, setData }} >

      <Header />
      <Home />

    </context.Provider>
  )
}

export default App