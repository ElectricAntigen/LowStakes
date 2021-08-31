import React from "react";
import {
  NativeBaseProvider,
} from "native-base";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainScreen from "./components/MainScreen";
import Generator from "./components/Generator";

export default function App() {
  const [currentPage, openPage] = React.useState("login");
  function navigate(page) {
    switch (page) {
      case "signUp":
        return <SignUp openPage={openPage} />;
      case "mainScreen":
        return <MainScreen openPage={openPage} />;
      case "chartScreen":
        return <Generator openPage={openPage} startPrice={100} quantity={100}/>;
      default:
        return <Login openPage={openPage} />;
    }
  }
  return <NativeBaseProvider>{navigate(currentPage)}</NativeBaseProvider>;
}
