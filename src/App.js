import React, { useState } from 'react';
import './scss/components/app.scss';
import Header from './components/Header';
import Home from './components/pages/Home';
import { createContext } from 'react';

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Home />
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
