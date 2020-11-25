import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RenderSuggestions from "./RenderSuggestions";
import FiatData from "./data/currencies.json";
import CryptoData from "./data/cryptocurrencies.json";

function App() {
  const BASE_URL = "https://www.alphavantage.co/query";
  const API_KEY = "VPN90NJ9XU0GAR3X";
  const currentSuggestion = useRef();
  const fromText = useRef();

  const [whichCurr, setWhichCurr] = useState(20);
  const [from, setFrom] = useState(true);
  const [to, setTo] = useState(false);
  const [pickedFrom, setPickedFrom] = useState("");
  const [pickedTo, setPickedTo] = useState("");
  const [toText, setToText] = useState("");
  const [exchangeRate, setExchangeRate] = useState();

  useEffect(() => {
    if (pickedFrom.length != 0 && pickedTo.length != 0) {
      let fromKey = getKeyByValue(pickedFrom);
      let toKey = getKeyByValue(pickedTo);

      fetch(
        BASE_URL +
          "?function=CURRENCY_EXCHANGE_RATE&from_currency=" +
          fromKey +
          "&to_currency=" +
          toKey +
          "&apikey=" +
          API_KEY,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setExchangeRate(
            data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
          );
        })
        .catch((error) => console.log(error));
    }
  }, [pickedFrom, pickedTo]);

  const [allValues, setAllValues] = useState(Object.values(FiatData));
  const [suggestions, setSuggestions] = useState([]);

  /* Find a key by value from object. Fx getKeyByValue(cryptocurrencies, "XTRABYTES") = XBY */
  function getKeyByValue(value) {
    let object;
    let fiat = Object.values(FiatData);
    fiat.findIndex((val) => val === value) != -1
      ? (object = FiatData)
      : (object = CryptoData);
    return Object.keys(object).find((key) => object[key] === value);
  }

  function onTextChanged(e) {
    const value = e.target.value;
    if (value.length > 0) {
      // Escape bad chars
      const escapeChars = value.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
      // Split input into an array of substrings
      const words = escapeChars.split(" ");
      // Regex (?=.*words). Will match next word if previous matches.
      const allWords = words.join(",");
      const searchInput =
        words.length === 1
          ? words
          : "(?=.*" + allWords.replace(new RegExp(",", "g"), ")(?=.*") + ")";
      const regex = new RegExp(searchInput, "i");
      setSuggestions(allValues.sort().filter((val) => val.match(regex)));
    } else {
      setSuggestions([]);
    }
  }

  function clickSuggestion(suggestion) {
    setSuggestions([]);
    currentSuggestion.current.value = suggestion;
  }

  useEffect(() => {
    whichCurr == 20
      ? setAllValues(Object.values(FiatData))
      : setAllValues(Object.values(CryptoData));
  }, [whichCurr]);

  function toggleRadio() {
    setFrom(!from);
    setTo(!to);
  }

  const handleSelectChange = (event) => {
    setWhichCurr(event.target.value);
  };

  function convertValue() {
    if (fromText.current.value != "") {
      setToText(exchangeRate * fromText.current.value);
    }
  }

  return (
    <>
      <NavBar handleSelectChange={handleSelectChange} whichCurr={whichCurr} />
      <div className="app">
        <div className="app-container">
          <div className="search_container">
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              inputRef={currentSuggestion}
              className="search"
              type="text"
              onChange={onTextChanged}
            />
            <div className={suggestions.length > 0 ? "container" : null}>
              <RenderSuggestions
                suggestions={suggestions}
                clickSuggestion={clickSuggestion}
              />
            </div>
            <div className={suggestions.length > 0 ? "hide-button" : null}>
              <Button
                onClick={() => {
                  if (from) {
                    setPickedFrom(currentSuggestion.current.value);
                    currentSuggestion.current.value = "";
                  } else {
                    setPickedTo(currentSuggestion.current.value);
                    currentSuggestion.current.value = "";
                  }
                }}
                className="button-css"
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
        <div className="convert">
          <div className="convert-container">
            <label>
              <input
                type="radio"
                name="convert"
                checked={from}
                onChange={toggleRadio}
              />
              {pickedFrom}
              <TextField
                inputRef={fromText}
                type="text"
                onChange={convertValue}
              />
            </label>
            <label>
              <input
                type="radio"
                name="convert"
                checked={to}
                onChange={toggleRadio}
              />
              {pickedTo}
              {toText}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
