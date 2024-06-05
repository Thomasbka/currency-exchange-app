import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Converter.css';
import fx from 'money';

const Converter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch('https://api.frankfurter.app/latest')
      .then(response => response.json())
      .then(data => {
        fx.rates = data.rates;
        fx.base = data.base;
        setRates(data.rates);
        setRates(prevRates => ({ EUR: 1, ...data.rates }));
      });
  }, []);

  const handleConvert = () => {
    const convertedAmount = fx(amount).from(fromCurrency).to(toCurrency);
    setResult(convertedAmount);
  };
  
  const handleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="converter">
      <div className="container">
        <div className="form-row">
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Amount" 
            className="form-control"
          />
          <select className="form-select"
            value={fromCurrency} 
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {Object.keys(rates).map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
          <button className="switch-button" onClick={handleSwitch}>
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </button>
          <select className="form-select"
            value={toCurrency} 
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {Object.keys(rates).map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <button className="convert-button" onClick={handleConvert}>Convert</button>
        <div className="result">
          {result && <p>{amount} {fromCurrency} = {result.toFixed(4)} {toCurrency}</p>}
        </div>
      </div>
    </div>
  );
};

export default Converter;
