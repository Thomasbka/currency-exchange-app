import React from 'react';
import Navbar from './Navbar';
import Converter from  './Converter';
import Currencies from './Currencies';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="">
      <Navbar />
      <div className="text-uppercase text-center">
        <h2 className="headline">Currency Converter</h2>
      </div>
      <Converter />
      <Footer />
    </div>
  );
}

export default App;
