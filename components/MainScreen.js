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
import { Pressable } from "react-native";

const StockLine = (props) => (
  <Pressable onPress={() => props.openPage({ page: "chartScreen", selectedStock: props.index })}>
    <HStack flex={1} alignItems="center" w="100%">
      <Box
        space={20}
        w="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        border={1}
        borderColor="lightgray"
        paddingLeft={2}
        paddingRight={2}
        bg={"grey"}
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
          bg={props.good ? "rgb(215,0,0)" : "rgb(0,215,0)"}
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
    </HStack>
  </Pressable>
);

export default function MainScreen(props) {
  const [[stocks, ii], setStocks] = React.useState([props.exchange.stocks, 0])
  let i = 0;
  React.useEffect(() => {
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
  );
}
