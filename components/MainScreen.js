import React from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Link,
  Row,
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
import { Pressable } from "react-native";

const StockLine = (props) => (
  <Pressable onPress={() => props.navigation.navigate("chartScreen", 
    { selectedStock: props.index, selectedStockName: `${props.stocks[props.index].name} (${props.stocks[props.index].symbol})`})}>
    <Row flex={1} alignItems="center" w="100%">
      <Box
        space={20}
        w="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        border={0}
        borderColor="lightgray"
        paddingLeft={2}
        paddingRight={2}
        bg={props.bg}
      >
        <Box w="50%" ph={10} alignItems="flex-start" justifyContent="center">
          <Heading paddingLeft={5}>{props.symbol}</Heading>
        </Box>
        <Box
          w="15%"
          alignItems="flex-end"
          justifyContent="center"
          flex={1}
          paddingRight={5}
          my={2}
        >
          <Text>{props.quantity}</Text>
        </Box>
        <Box
          bg={props.good ? "rgb(0,215,0)" : "rgb(215,0,0)"}
          size={16}
          rounded="md"
          alignItems="flex-end"
          justifyContent="center"
          flex={1}
          paddingRight={5}
          my={2}
        >
          <Text color="white">{props.price}</Text>
        </Box>
      </Box>
    </Row>
  </Pressable>
);

export default function MainScreen(props) {
  const [[stocks, ii], setStocks] = React.useState([props.exchange.stocks, 0])
  let i = 0;
  React.useEffect(() => {
<<<<<<< HEAD
      const interval = setInterval(() => setStocks([props.exchange.stocks, ++i]), 500);
      // const interval = setInterval(() => setStocks([[{symbol: "aa", price: 100.0, change: 50, openQuantity: 2, }], ++i]), 500);
      return () => clearInterval(interval);
  }, []);
  return (
    <FlatList
      bg = {"grey"}
      data={stocks.map((item, index) => {
        item.index = index;
        return item;
      })}
      renderItem={({item}) => (
        <StockLine
          index={item.index}
          symbol={item.symbol}
          price={item.price.toFixed(2)}
          good={item.change > 0}
          quantity={item.openQuantity}
          bg={item.index % 2 === 1 ? "grey" : "darkgrey"}
          navigation={props.navigation}
          stocks={stocks}
        />
      )}
      keyExtractor={(item) => item.symbol}
    />
=======
      const interval = setInterval(() => setStocks([props.exchange.stocks, ++i]), 100);
      return () => clearInterval(interval);
  }, []);
  return (
    stocks  
      ? <FlatList
        paddingTop={20}
        bg = {"grey"}
        data={stocks.map((item, index) => {
          item.index = index;
          return item;
        })}
        renderItem={({item}) => (
          <StockLine
            index={item.index}
            symbol={item.symbol}
            price={item.price.toFixed(2)}
            good={item.change > 0}
            quantity={item.openQuantity}
            bg={item.index % 2 === 0 ? "white" : "lightgrey"}
            openPage={props.openPage}
          />
        )}
        keyExtractor={(item) => item.symbol}
      />
      : <Center/>
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
  );
}
