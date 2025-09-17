
import './App.css';
 import React, { useState } from 'react';
import CurrencyRates from './CurrencyRates';
import Books from './Books';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   return (

    <div>
     {isLoggedIn ? (
        //<CurrencyRates />
        <Books />
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}

    </div>

  );
  
}
//mk
export default App;
