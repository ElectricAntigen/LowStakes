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
  <Pressable onPress={() => props.openPage("chartScreen")}>
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
  const data = [
    { symbol: "AMAZ", price: 12.7, quantity: 12, good: true },
    { symbol: "AMD", price: 22.5, quantity: 25, good: false },
    { symbol: "AAPL", price: 66.9, quantity: 11, good: true },
    { symbol: "BBC", price: 13.2, quantity: 23, good: false },
    { symbol: "BTC", price: 98.1, quantity: 55, good: true },
  ];
  return (
    <NativeBaseProvider>
      <FlatList
        paddingTop={20}
        data={data.map((item, index) => {
          return { ...item, index };
        })}
        renderItem={({ item }) => (
          <StockLine
            symbol={item.symbol}
            price={item.price}
            good={item.good}
            quantity={item.quantity}
            bg={item.index % 2 === 0 ? "white" : "lightgrey"}
            openPage={props.openPage}
          />
        )}
        keyExtractor={(item) => item.symbol}
      />
    </NativeBaseProvider>
  );
}
