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
  Column,
  Code,
} from "native-base";
import ChartJS from "./Chart";

export default function Details(props) {
  // const details = props.details

  const currentPrice = props.data[props.data.length-1]
  const open = props.data[0]
  
  const details = {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: currentPrice,
    currency: "USD",
    change: currentPrice - open,
    changePercent: (currentPrice - open)/open*100,
    date: "Nov 12, 9:53 AM EST",
    open: open,
    prevClose: 350.51,
    high: Math.max(...props.data),
    low: Math.min(...props.data),
  };

  function toFixedTag(val) {
    return (val !== undefined && Number.isFinite(val)) ? val.toFixed(2) : ""
  }

  // const data = [
  //   { quarter: 1, earnings: 13000 },
  //   { quarter: 2, earnings: 16500 },
  //   { quarter: 3, earnings: 14250 },
  //   { quarter: 4, earnings: 19000 },
  // ];

  const [pressed, setPressed] = React.useState(0);

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
      bg={props.idx === pressed ? "black" : ""}
    >
      {props.children}
    </Button>
  );

  return (
    <Box flex={1}>
      <Column bg={"grey"} pt={10} px={5}>
        <Heading>{details.name}</Heading>
        <Text>{details.symbol}</Text>
        <Row pt={2} alignItems={"flex-end"}>
          <Heading>{toFixedTag(details.price)} </Heading>
          <Text pb={1}>{details.currency} </Text>
          <Text pb={1} color={"#B22222"}>
            {toFixedTag(details.change)} ({toFixedTag(details.changePercent)}%){" "}
          </Text>
        </Row>
        <Text>{details.date}</Text>

        <Box pt={2}>
          {/* <Row px={-1}>
                        <SmallRow caption="Open" value={details.open} />
                        <SmallRow caption="Prev close" value={details.prevClose} />
                    </Row>
                    <Row px={-1}>
                        <SmallRow caption="High" value={details.high} />
                        <SmallRow caption="Low" value={details.low} />
                    </Row> */}
          <Row>
            <Row w={"50%"} justifyContent="space-between" pr={1}>
              <Text color="white" bold={true}>
                Open
              </Text>
              <Text>{toFixedTag(details.open)}</Text>
            </Row>
            <Row w={"50%"} justifyContent="space-between" pl={1}>
              <Text color="white" bold={true}>
                Previous close
              </Text>
              <Text>{toFixedTag(details.prevClose)}</Text>
            </Row>
          </Row>
          <Row>
            <Row w={"50%"} justifyContent="space-between" pr={1}>
              <Text color="white" bold={true}>
                High
              </Text>
              <Text>{toFixedTag(details.high)}</Text>
            </Row>
            <Row w={"50%"} justifyContent="space-between" pl={1}>
              <Text color="white" bold={true}>
                Low
              </Text>
              <Text>{toFixedTag(details.low)}</Text>
            </Row>
          </Row>
        </Box>
        <Row pt={3} width={"100%"}>
          <RangeButton idx={0}>1h</RangeButton>
          <RangeButton idx={1}>1d</RangeButton>
          <RangeButton idx={2}>1w</RangeButton>
          <RangeButton idx={3}>1m</RangeButton>
          <RangeButton idx={4}>3m</RangeButton>
          <RangeButton idx={5}>6m</RangeButton>
          <RangeButton idx={6}>9m</RangeButton>
          <RangeButton idx={7}>1y</RangeButton>
        </Row>
      </Column>
      <Center>
        <Text fontsize={40} pt={15}>
          {pressed}
        </Text>
      </Center>
      <ChartJS data={props.data} />
    </Box>
  );
}
