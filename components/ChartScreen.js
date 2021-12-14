import React from "react";
import { Exchange, getLastHour } from "../logic/simulator";
import {
  Box,
  Text,
  Button,
  Row,
  Center,
  Heading,
  Column,
} from "native-base";
import { InteractionManager } from "react-native";
import LineChart from "./LineChart";
import CandleChart from "./CandleChart";

export default function ChartScreen(props) {
<<<<<<< HEAD
  const [pressed, setPressed] = React.useState(0);
  const stocks = props.exchange.stocks;
  const [tick, setTick] = React.useState(0)
  let i = 0;
  React.useEffect(() => {
      const interval = setInterval(() => InteractionManager.runAfterInteractions(() => setTick(++i)), 2000);
      return () => clearInterval(interval);
  }, []);
=======
<<<<<<< HEAD
  const [pressed, setPressed] = React.useState(0);
  const [[stocks, ii], setStocks] = React.useState([props.exchange.stocks, 0])
  let i = 0;
  React.useEffect(() => {
      const interval = setInterval(() => setStocks([props.exchange.stocks, ++i]), 2000);
      return () => clearInterval(interval);
  }, []);

  const stock = stocks[props.route.params.selectedStock];
=======
  const [[stocks, ii], setStocks] = React.useState([props.exchange.stocks, 0])
  let i = 0;
  React.useEffect(() => {
      const interval = setInterval(() => setStocks([props.exchange.stocks, ++i]), 300);
      return () => clearInterval(interval);
  }, []);

  const stock = stocks[props.selectedStock];
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
  const lastPoint = stock.currentPricePoint;
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136

  const stock = stocks[props.route.params.selectedStock];
  const lastPoint = stock.currentPricePoint;

<<<<<<< HEAD
  const toFixedTag = (val) => val !== undefined && Number.isFinite(val) ? val.toFixed(2) : ""

=======
<<<<<<< HEAD
=======
  const [pressed, setPressed] = React.useState(0);
  // const dataToDisplay = pressed === 0 ? props.data?.filter(b => b.time > hourAgo) : props.data
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
  let dataToDisplay = []; 
  switch (pressed) {
    case 0: dataToDisplay = stock.pricePoints10s; break;
    case 1: dataToDisplay = stock.pricePoints30s; break;
<<<<<<< HEAD
    case 2: dataToDisplay = stock.pricePoints1h; break;
    case 3: dataToDisplay = stock.pricePoints1d; break;
=======
<<<<<<< HEAD
    case 2: dataToDisplay = stock.pricePoints1h; break;
    case 3: dataToDisplay = stock.pricePoints1d; break;
=======
    case 2: dataToDisplay = stock.pricePoints; break;
    case 3: dataToDisplay = stock.pricePoints; break;
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
    case 4: dataToDisplay = [...stock.historicalPricePoints.week, stock.currentPricePoint]; break;
    case 5: dataToDisplay = [...stock.historicalPricePoints.month, stock.currentPricePoint]; break;
    case 6: dataToDisplay = [...stock.historicalPricePoints.month3, stock.currentPricePoint]; break;
    case 7: dataToDisplay = [...stock.historicalPricePoints.year, stock.currentPricePoint]; break;  
  }

  const SmallRow = (props) => (
    <Row w={"50%"} justifyContent="space-between" px={1}>
      <Text color="white" bold={true}>
        {props.caption}
      </Text>
      <Text>{props.value}</Text>
    </Row>
  );

  const RangeButton = (props) => (
    <Button
      flexGrow={1}
      borderRadius={0}
      px={0}
      py={2}
      onPress={() => setPressed(props.idx)}
<<<<<<< HEAD
      bg={props.idx === pressed ? "black" : "grey"}
=======
      bg={props.idx === pressed ? "black" : ""}
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
      contentStyle={{width: '100%'}}
    >
      {props.children}
    </Button>
  );

  const BuyButton = (props) => (
    <Button
      flexGrow={1}
      borderRadius={0}
      px={0}
      py={2}
<<<<<<< HEAD
      onPress={() => props.navigation.navigate("buySellScreen", { 
          selectedStock: props.index, 
          selectedStockName: `${stock.name} (${stock.symbol})`,
          stock: stock,
          isBuy: true,
          price: stock.price 
        })}
=======
      onPress={() => props.navigation.navigate("buySellScreen", 
        { selectedStock: props.index, selectedStockName: `${props.stock.name} (${props.stock.symbol})`})}
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
      bg="rgb(0,215,0)"
    >
      BUY
    </Button>
  );

  const SellButton = (props) => (
    <Button
      flexGrow={1}
      borderRadius={0}
      px={0}
      py={2}
<<<<<<< HEAD
      onPress={() => props.navigation.navigate("buySellScreen", { 
          selectedStock: props.index, 
          selectedStockName: `${props.stock.name} (${props.stock.symbol})`,
          stock: stock,
          isBuy: false,
          price: stock.price 
        })}
=======
      onPress={() => props.navigation.navigate("buySellScreen", 
        { selectedStock: props.index, selectedStockName: `${props.stock.name} (${props.stock.symbol})`})}
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
      bg="rgb(215,0,0)"
    >
      SELL
    </Button>
  );

<<<<<<< HEAD
  const OrderHistoryButton = (props) => (
    <Button
      flexGrow={1}
      borderRadius={0}
      px={0}
      py={2}
      onPress={() => props.navigation.navigate("orderHistoryScreen", { 
          selectedStock: props.index, 
          selectedStockName: `${props.stock.name} (${props.stock.symbol})`,
          stock: stock,
        })}
      bg="darkgrey"
    >
      Order History
    </Button>
  );

  return (
    <Box flex={1} bg={"grey"}>
      <Column pt={1} px={5} >
=======
  return (
<<<<<<< HEAD
    <Box flex={1} bg={"grey"}>
      <Column pt={5} px={5} >
=======
    <Box flex={1}>
      <Column bg={"grey"} pt={10} px={5}>
        <Heading>{stock.name}</Heading>
        <Text>{stock.symbol}</Text>
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
        <Row pt={2} alignItems={"flex-end"}>
          <Heading>{toFixedTag(lastPoint.price)} </Heading>
          <Text pb={1}>{stock.currency} </Text>
          <Text pb={1} color={"#B22222"}>
            {toFixedTag(stock.change)} ({toFixedTag(stock.changePercent)}%){" "}
          </Text>
        </Row>
        <Text>{lastPoint.time.toString()}</Text>

        <Box pt={2}>
          <Row>
<<<<<<< HEAD
            <Row w="50%" justifyContent="space-between" pr={1}>
              <Text color="white" bold={true}>Open</Text>
=======
            <Row w={"50%"} justifyContent="space-between" pr={1}>
              <Text color="white" bold={true}>
                Open
              </Text>
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
              <Text>{toFixedTag(lastPoint.open)}</Text>
            </Row>
            <Row w="50%" justifyContent="space-between" pl={1}>
              <Text color="white" bold={true}>
                Previous close
              </Text>
              <Text>{toFixedTag(lastPoint.prevClose)}</Text>
            </Row>
          </Row>
          <Row>
            <Row w="50%" justifyContent="space-between" pr={1}>
              <Text color="white" bold={true}>
                High
              </Text>
              <Text>{toFixedTag(lastPoint.high)}</Text>
            </Row>
            <Row w="50%" justifyContent="space-between" pl={1}>
              <Text color="white" bold={true}>
                Low
              </Text>
              <Text>{toFixedTag(lastPoint.low)}</Text>
            </Row>
          </Row>
        </Box>
<<<<<<< HEAD
        <Row pt={3} w="100%">
=======
        <Row pt={3} width={"100%"}>
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
          <RangeButton idx={0}>10s</RangeButton>
          <RangeButton idx={1}>30s</RangeButton>
          <RangeButton idx={2}>1h</RangeButton>
          <RangeButton idx={3}>1d</RangeButton>
          <RangeButton idx={4}>1w</RangeButton>
          <RangeButton idx={5}>1m</RangeButton>
          <RangeButton idx={6}>3m</RangeButton>
          <RangeButton idx={7}>1y</RangeButton>
        </Row>
        <Row>
          {pressed < 4 ? <LineChart data={dataToDisplay} /> : <CandleChart data={dataToDisplay} />}
        </Row>
<<<<<<< HEAD
        <Row pt={0} w="100%" justifyContent="space-between">
          <BuyButton stock={stock} {...props} />
          <SellButton stock={stock} {...props} />
        </Row>
        <Row pt={3} w="100%" justifyContent="center">
          <OrderHistoryButton stock={stock} {...props} />
        </Row>
=======
        <Row pt={3} width={"100%"} justifyContent="space-between">
          <BuyButton stock={stock} {...props} />
          <SellButton stock={stock} {...props} />
        </Row>
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
      </Column>
    </Box>
  );
}
