
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyRates = () => {
  // State variables
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Currency flags
  const currencyFlags = {
    USD: '🇺🇸',
    INR: '🇮🇳',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    JPY: '🇯🇵',
    HKD: '🇭🇰',
    CAD: '🇨🇦'
  };

  // Fetch exchange rates
  useEffect(() => {
    if (!amount || isNaN(amount)) return;

    setLoading(true);
    setError('');

    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
        const rate = response.data.rates[toCurrency];
        const result = (amount * rate).toFixed(2);
        setConvertedAmount(result);
        setLastUpdated(new Date(response.data.time_last_updated * 1000).toLocaleString());

        // Update history
        setHistory(prev => [
          { amount, fromCurrency, toCurrency, convertedAmount: result },
          ...prev.slice(0, 4)
        ]);
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

  // Theme styles
  const themeStyles = {
    backgroundColor: darkMode ? '#222' : '#fff',
    color: darkMode ? '#fff' : '#000',
    padding: '1rem',
    minHeight: '100vh'
  };

  return (
    <div style={themeStyles}>
      <h2>Currency Converter Website</h2>

      <button onClick={() => setDarkMode(!darkMode)} style={{ marginBottom: '1rem' }}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

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
        <>
          <p>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
          <p>1 {toCurrency} = {(1 / (convertedAmount / amount)).toFixed(4)} {fromCurrency}</p>
        </>
      )}

      {lastUpdated && <p>Last updated: {lastUpdated}</p>}

      {history.length > 0 && (
        <div>
          <h4>Recent Conversions</h4>
          <ul>
            {history.map((item, idx) => (
              <li key={idx}>
                {item.amount} {item.fromCurrency} → {item.convertedAmount} {item.toCurrency}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencyRates;
