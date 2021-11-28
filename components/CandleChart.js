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
  VictoryZoomContainer,
} from "victory-native";

const CandleChart = (props) => {
  return (
<<<<<<< HEAD
    <Center flex={1} bg="grey"
      // domain={{y: [0, 100]}}
      // containerComponent={<VictoryZoomContainer zoomDomain={{x: [props.data[0].time, new Date(Date.now())], y: [0, 100]}}/>}
      >
      <VictoryChart width={350} height={400} theme={VictoryTheme.material} scale={{x: "time"}} > 
        <VictoryCandlestick data={props.data} x="time" open="open" close="price" low="low" high = "high"
          candleColors={{ positive: "rgb(0,215,0)", negative: "rgb(215,0,0)" }}
          />
=======
    <Center flex={1} bg="grey">
      <VictoryChart width={350} height={500} theme={VictoryTheme.material}>
        <VictoryCandlestick data={props.data} x="time" open="open" close="price" low="low" high = "high"/>
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
      </VictoryChart>
    </Center>
  );
};

export default CandleChart;
