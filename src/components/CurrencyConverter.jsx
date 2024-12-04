import React from "react";
import { useState, useEffect } from "react";
import CurrencyList from "./CurrencyList";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(1);
  const [converting, setConverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["EUR", "USD"]
  );

  const URL = "https://api.frankfurter.app/currencies";

  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConvertedData = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      );
      const data = await response.json();

      setConvertedAmount(data.rates[toCurrency]);
    } catch (error) {
      console.log(error);
    } finally {
      setConverting(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleConvertion = () => {
    fetchConvertedData();
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleFavorite = (val) => {
    let updated_favorites = [...favorites];
    if (favorites.includes(val)) {
      updated_favorites = updated_favorites.filter((c) => c != val);
    } else {
      updated_favorites.push(val);
    }
    setFavorites(updated_favorites);
    localStorage.setItem("favorites", JSON.stringify(updated_favorites));
  };
  return (
    <div>
      <h1>CurrencyConverter</h1>
      <div className="curr-container">
        <CurrencyList
          currencies={currencies}
          title={"From"}
          handleCurrencyClick={(c) => setFromCurrency(c)}
          value={fromCurrency}
          favorites={favorites}
          handleFavorite={handleFavorite}
        />
        <CurrencyList
          currencies={currencies}
          title={"To"}
          handleCurrencyClick={(c) => setToCurrency(c)}
          value={toCurrency}
          favorites={favorites}
          handleFavorite={handleFavorite}
        />
      </div>
      <div className="amount">
        <label htmlFor="amount">Amount: </label>
        <input value={amount} onChange={handleAmountChange} />
      </div>
      <div className="convert-button">
        <button onClick={handleConvertion}>Convert</button>
      </div>
      {converting ? (
        <h3> Converting... </h3>
      ) : (
        <div className="converted-container">
          <label htmlFor="converted">
            {" "}
            <h3>Converted amount: </h3>
          </label>{" "}
          {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
