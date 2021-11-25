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
import { StyleSheet } from "react-native";
import {
  VictoryChart,
  VictoryTheme,
  VictoryCandlestick,
} from "victory-native";

const CandleChart = (props) => {
  return (
    <Center flex={1} bg="grey">
      <VictoryChart width={350} height={500} theme={VictoryTheme.material}>
        <VictoryCandlestick data={props.data} x="time" open="open" close="price" low="low" high = "high"/>
      </VictoryChart>
    </Center>
  );
};

export default CandleChart;
