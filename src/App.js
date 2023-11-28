import React, { useState } from 'react';
import './scss/components/app.scss';
import Header from './components/Header';
import Home from './components/pages/Home';

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Home searchValue={searchValue} />
      </div>
    </div>
  );
}

export default App;
