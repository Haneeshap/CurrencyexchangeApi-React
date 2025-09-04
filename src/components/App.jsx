const { getByTestId } = require("@testing-library/dom")

 getByTestId



 import CurrencyNewsPanel from './currencynewspanel';

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  return (
    <div>
      {/* Your currency converter UI */}
      <CurrencyNewsPanel currencyCode={selectedCurrency} />
    </div>
  );
}