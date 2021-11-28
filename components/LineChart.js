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
import { //Importing all necessary resources from victory native.
  VictoryChart,
  VictoryTheme,
  VictoryLine,
} from "victory-native";

const LineChart = (props) => { //Defining the display of the graph.
  return (
    <Center flex={1} bg="grey">
      <VictoryChart width={400} height={400} theme={VictoryTheme.material}>
        <VictoryLine data={props.data} x="time" y="price" />
      </VictoryChart>
    </Center>
  );
};

export default LineChart; //Returning the chart.
