import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Converter from  './Converter';
import Currencies from './Currencies';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="headline text-uppercase">
        <h2>Currency Converter</h2>
      </div>
      <Converter />
      <Footer />
    </div>
  );
}

export default App;
