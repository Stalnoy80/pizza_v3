import React from 'react';
import './scss/components/app.scss';
import Header from './components/Header';
import Home from './components/pages/Home';

// import pizzas from './assets/pizzas.json';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Home />
      </div>
    </div>
  );
}

export default App;
