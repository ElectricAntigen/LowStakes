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
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAnimation,
  VictoryCandlestick,
} from "victory-native";

const Chart = (props) => {
  return (
    <Center flex={1} bg="grey">
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryLine data={props.data} x="quarter" y="earnings" />
      </VictoryChart>
    </Center>
  );
};

export default Chart;
