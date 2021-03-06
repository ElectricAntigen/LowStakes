import React from "react";
import {
  NativeBaseProvider,
} from "native-base";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainScreen from "./components/MainScreen";
import ChartScreen from "./components/ChartScreen";
<<<<<<< HEAD
import BuySellScreen from "./components/BuySellScreen";
import OrderHistoryScreen from "./components/OrderHistoryScreen";
import { Exchange } from "./logic/simulator";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
=======
<<<<<<< HEAD
import { Exchange } from "./logic/simulator";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuySellScreen from "./components/BuySellScreen";
=======
import { Exchange, StockInfo } from "./logic/simulator";
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136

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

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
const Stack = createNativeStackNavigator();

export default function App() {
  return <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: 'grey',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        initialRouteName="login">
        <Stack.Screen name="login" options={({ headerShown: false })}>{props => <Login {...props} />}</Stack.Screen>
        <Stack.Screen name="signUp">{props => <SignUp {...props} />}</Stack.Screen>
        <Stack.Screen name="mainScreen" options={({ title: 'Stocks' })}>{props => <MainScreen {...props} exchange={exchange} />}</Stack.Screen>
        <Stack.Screen name="chartScreen" options={({ route }) => ({ title: route.params.selectedStockName })}>{props => <ChartScreen {...props} exchange={exchange} />}</Stack.Screen>
        <Stack.Screen name="buySellScreen" options={({ route }) => ({ title: route.params.selectedStockName })}>{props => <BuySellScreen {...props} exchange={exchange} />}</Stack.Screen>
<<<<<<< HEAD
        <Stack.Screen name="orderHistoryScreen" options={({ route }) => ({ title: route.params.selectedStockName })}>{props => <OrderHistoryScreen {...props} exchange={exchange} />}</Stack.Screen>
        <Stack.Screen name="orderMatches" options={({ route }) => ({ title: route.params.selectedStockName })}>{props => <OrderMatchesScreen {...props} exchange={exchange} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  </NativeBaseProvider>
=======
      </Stack.Navigator>
    </NavigationContainer>
  </NativeBaseProvider>
=======
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
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
}
