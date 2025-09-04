
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  // Your state variables go here
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch exchange rates
  useEffect(() => {
    if (!amount || isNaN(amount)) return;

    setLoading(true);
    setError('');

    axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
        const rate = response.data.rates[toCurrency];
        setConvertedAmount((amount * rate).toFixed(2));
        setLastUpdated(new Date(response.data.time_last_updated * 1000).toLocaleString());
      })
      .catch(() => {
        setError('Failed to fetch exchange rates. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [amount, fromCurrency, toCurrency]);

  // Flip currencies
  const handleFlip = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Currency flags
  const currencyFlags = {
    USD: '🇺🇸',
    INR: '🇮🇳',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    JPY: '🇯🇵',
    HKD: 'hk',
    CAD:'ca'  };

  return (
    <div>
      <h2>Currency Converter Website</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter the amount"
      />

      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {Object.keys(currencyFlags).map(code => (
          <option key={code} value={code}>
            {currencyFlags[code]} {code}
          </option>
        ))}
      </select>

      <button onClick={handleFlip}>🔄 Flip</button>

      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {Object.keys(currencyFlags).map(code => (
          <option key={code} value={code}>
            {currencyFlags[code]} {code}
          </option>
        ))}
      </select>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {convertedAmount && (
        <p>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
      )}
      {lastUpdated && <p>Last updated: {lastUpdated}</p>}
    </div>
  );
};

export default CurrencyConverter;