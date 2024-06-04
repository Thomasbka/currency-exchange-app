import React, { useState, useEffect } from 'react';

const Currencies = () => {
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    fetch('https://api.frankfurter.app/currencies')
      .then(response => response.json())
      .then(data => setCurrencies(data));
  }, []);

  return (
    <div>
      <h1>Available Currencies</h1>
      <ul>
        {Object.entries(currencies).map(([code, name]) => (
          <li key={code}>{code}: {name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Currencies;
