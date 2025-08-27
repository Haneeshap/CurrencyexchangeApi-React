
import React, { useEffect, useState } from 'react';

const CurrencyRates = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/7e0819a9bf46958eb8b50810/latest/USD')
      .then(response => response.json())
      .then(data => {
        setRates(data.conversion_rates); // Extract sub-JSON
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading exchange rates...</p>;

  return (
    <div>
      <h2>Exchange Rates (Base: USD)</h2>
      <ul>
        {Object.entries(rates)
        .filter(([currency]) => currency === 'INR' || currency === 'EUR' || currency === 'SGD' || currency === 'JPY')
        .map(([currency, rate]) => (
          <li key={currency}>
            {currency}: {rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyRates;