
import './App.css';
 import React, { useState } from 'react';
import CurrencyRates from './CurrencyRates';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   return (

    <div>
     {isLoggedIn ? (
        <CurrencyRates />
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}

    </div>

  );
  
}

export default App;
