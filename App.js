import React from "react";
import {
  NativeBaseProvider,
} from "native-base";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainScreen from "./components/MainScreen";
import ChartScreen from "./components/ChartScreen";
import { Exchange, StockInfo } from "./logic/simulator";

const compData = [ //The declaration of the record array.
  { symbol: "AMAZ", name: "Amazon.com, Inc.", price: 3446.57, quantity: 12, good: true }, //Each line is a separate record.
  { symbol: "AMD", name: "Advanced Micro Devices, Inc.", price: 121.16, quantity: 25, good: false },
  { symbol: "AAPL", name: "Apple, Inc.", price: 152.57, quantity: 11, good: true }, 
  { symbol: "BP", name: "British Petroleum plc", price: 353.15, quantity: 23, good: false },
  { symbol: "CAJ", name: "Canon, Inc.", price: 22.49, quantity: 55, good: true },
  { symbol: "DAL", name: "Delta Air Lines, Inc.", price: 39.05, quantity: 55, good: true },
  { symbol: "XOM", name: "Exxon Mobil Corporation", price: 63.88, quantity: 55, good: true },
  { symbol: "FB", name: "Facebook, Inc.", price: 315.44, quantity: 55, good: true },
  { symbol: "GME", name: "GameStop Corp.", price: 180.58, quantity: 55, good: true },
]; //The order of details in each record is: acronymised name, name of the stock, price, quantity, and whether the price
//   increased or decreased.

const exchange = new Exchange(compData, 100, true);

export default function App(props) {
  const [currentPage, openPage] = React.useState({page: "login", selectedStock: null });
  function navigate({page, selectedStock}) {
    switch (page) {
      case "signUp":
        return <SignUp openPage={openPage} />;
      case "mainScreen":
        return <MainScreen openPage={openPage} exchange={exchange} />;
      case "chartScreen":
        console.log(selectedStock)
        return <ChartScreen openPage = {openPage} exchange={exchange} selectedStock = {selectedStock}/>;
      default:
        return <Login openPage={openPage} />;
    }
  } 
  return <NativeBaseProvider>{navigate(currentPage)}</NativeBaseProvider>;
}
