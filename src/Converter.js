import React, { useState, useEffect } from 'react';
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
      });
  }, []);

  const handleConvert = () => {
    const convertedAmount = fx(amount).from(fromCurrency).to(toCurrency);
    setResult(convertedAmount);
  };

  return (
    <div className="container text-white">
      <div>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Amount" 
        />
        <select className="mx-2"
          value={fromCurrency} 
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(rates).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <select 
          value={toCurrency} 
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(rates).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <button className="convert-button" onClick={handleConvert}>Convert</button>
        <div className="result">
        {result && <p>{amount} {fromCurrency} = {result.toFixed(4)} {toCurrency}</p>}
        </div>
      </div>
    </div>
  );
};

export default Converter;
