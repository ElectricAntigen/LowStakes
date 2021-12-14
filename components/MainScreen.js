import React from "react";
import {
  Box,
  Text,
  Row,
  Heading,
  FlatList,
} from "native-base";
import { Pressable, InteractionManager } from "react-native";

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
  const stocks = props.exchange.stocks;
  const [tick, setTick] = React.useState(0)
  let i = 0;
  React.useEffect(() => {
      const interval = setInterval(() => InteractionManager.runAfterInteractions(() => setTick(++i)), 500);
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
  );
}
