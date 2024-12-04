import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi";

const CurrencyList = ({
  title,
  currencies,
  handleCurrencyClick,
  value,
  favorites,
  handleFavorite,
}) => {
  const isFavorite = (c) => favorites.includes(c);
  return (
    <div>
      <label htmlFor={title}> {title} </label>
      <div>
        <select
          onChange={(e) => handleCurrencyClick(e.target.value)}
          value={value}
        >
          {favorites.map((c) => {
            return (
              <option key={c} value={c}>
                {c}
              </option>
            );
          })}
          <hr />
          {currencies
            .filter((c) => !favorites.includes(c))
            .map((c) => {
              return (
                <option key={c} value={c}>
                  {c}
                </option>
              );
            })}
        </select>
        <button onClick={() => handleFavorite(value)}>
          {isFavorite(value) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default CurrencyList;
