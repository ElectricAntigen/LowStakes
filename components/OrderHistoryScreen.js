import React from "react";
import {
  Box,
  Text,
  Row,
  Column,
  Switch,
  FlatList,
} from "native-base";
import { Pressable, InteractionManager } from "react-native";

const toFixedTag = (val, digits) => val !== undefined && Number.isFinite(val) ? val.toFixed(digits) : ""

const Pair = props => <Row justifyContent="space-between" pr={1} {...props}>
  <Text color="white" bold={true}>{props.name}</Text>
  <Text>{props.val}</Text>
</Row>

const OrderLine = (props) => {
  const matchedQuantity = props.stock.orderReceipts.get(props.order.id).reduce((sum, or) => sum + or.quantity, 0);
  const matchedPercent = matchedQuantity / props.order.quantity * 100.0;
  const matchedColour = matchedPercent < 50 ? "215,0,0" : (matchedPercent < 100 ? "215,215,0" : "0,215,0");
  return <Pressable
    onPress={() => props.navigation.navigate("orderMatches", 
    { orderId: props.order.id, selectedStock: props.index, selectedStockName: `${props.stocks[props.index].name} (${props.stocks[props.index].symbol})`})}>
    <Column  bg={props.bg} px={10}>
      <Row>
        <Column w='50%'>
          <Pair name='Order Id' val={props.order.id}/>
          <Pair name='User' val={props.order.userId == 0 ? "robot" : "maxym"}/>
          <Pair name='Price' val={toFixedTag(props.order.price, 2)}/>
          <Pair name='Quantity' val={toFixedTag(props.order.quantity, 2)}/>
        </Column>
        <Column w='50%' pl={3}>
          <Text color={props.order.isBuy ? "rgb(0,215,0)" : "rgb(215,0,0)"}>{props.order.isBuy ? "Buy Order" : "Sell Order"}</Text>
          <Pair name='Matches' val={props.stock.orderReceipts.get(props.order.id).length}/>
          <Pair name='Match Qty' val={matchedQuantity}/>
          <Pair name='Match %' val={toFixedTag(matchedPercent, 0)}/>
        </Column>
      </Row>
      <Row>
        <Column w={matchedPercent + "%"} 
          h={2} bg={`rgb(${matchedColour})`} borderLeftRadius={2}><Text> </Text></Column>
        <Column w={(100.0 - matchedPercent) + "%"} 
          h={2} bg={`rgba(${matchedColour},0.2)`} borderLeftRadius={2}><Text> </Text></Column>
      </Row>
      <Row>
        <Pair name='Accepted ' val={props.ticket.time.toString()}/>
      </Row>
    </Column>
  </Pressable>
}

export default function OrderHistoryScreen(props) {
  const stock = props.route.params.stock;
  const [tick, setTick] = React.useState(0)
  let i = 0;
  React.useEffect(() => {
      const interval = setInterval(() => InteractionManager.runAfterInteractions(() => setTick(++i)), 1000);
      return () => clearInterval(interval);
  }, []);
  return (
    <Box flex={1} bg={"grey"}>
      <Row alignItems="center" space={4} px={10}>
        <Text>My Orders</Text>
        <Switch  />
      </Row>
      <FlatList
        bg = {"grey"}
        data={[...stock.lastOrders].reverse().map(([ticket, order], index) => {
          return {ticket, order, index};
        })}
        renderItem={({item}) => (
          <OrderLine
            index={item.index}
            stock={stock}
            order={item.order}
            ticket={item.ticket}
            bg={item.index % 2 === 1 ? "grey" : "darkgrey"}
            navigation={props.navigation}
          />
        )}
        keyExtractor={(item) => item.index}
      />
    </Box>
  );
}
