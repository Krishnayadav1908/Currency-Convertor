import React, { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  function swap() {
    const tempAmount = amount;
    setAmount(convertedAmount);
    setConvertedAmount(tempAmount);

    const tempCurrency = from;
    setFrom(to);
    setTo(tempCurrency);
  }

  const convert = () => {
    if (!currencyInfo[from] || !currencyInfo[to]) return;
    setConvertedAmount(amount * (currencyInfo[to] / currencyInfo[from]));
  };

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/5746260/pexels-photo-5746260.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md mx-auto p-6 rounded-2xl backdrop-blur-lg bg-white/40 shadow-lg border border-white/30">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          💱 Currency Converter
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          {/* From Input */}
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(amount) => setAmount(amount)}
          />

          {/* Swap Button */}
          <div className="flex justify-center my-4">
            <button
              type="button"
              onClick={swap}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-md transform hover:scale-105 transition-transform"
            >
              ⇄ Swap
            </button>
          </div>

          {/* To Input */}
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
          />

          {/* Convert Button */}
          <button
            type="submit"
            className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            Convert {from.toUpperCase()} → {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
