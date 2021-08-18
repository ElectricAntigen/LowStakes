import React from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  Stack,
  VStack,
  Code,
  Flex,
  View,
  Spacer,
  FlatList,
} from "native-base";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainScreen from "./components/MainScreen";

export default function App() {
  const [currentPage, openPage] = React.useState("login");
  function navigate(page) {
    switch (page) {
      case "signUp":
        return <SignUp openPage={openPage} />;
      case "mainScreen":
        return <MainScreen openPage={openPage} />;
      default:
        return <Login openPage={openPage} />;
    }
  }
  return <NativeBaseProvider>{navigate(currentPage)}</NativeBaseProvider>;
}
