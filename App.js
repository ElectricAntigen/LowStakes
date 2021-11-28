import React from "react";
import {
  NativeBaseProvider,
} from "native-base";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainScreen from "./components/MainScreen";
import ChartScreen from "./components/ChartScreen";
import { Exchange } from "./logic/simulator";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuySellScreen from "./components/BuySellScreen";

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
      </Stack.Navigator>
    </NavigationContainer>
  </NativeBaseProvider>
}
