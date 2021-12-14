import React from "react";
import {
  Center,
} from "native-base";
import {
  VictoryChart,
  VictoryTheme,
  VictoryCandlestick,
} from "victory-native";

const CandleChart = (props) => {
  return (
    <Center flex={1} bg="grey">
      <VictoryChart width={350} height={400} theme={VictoryTheme.material} scale={{x: "time"}} > 
        <VictoryCandlestick data={props.data} x="time" open="open" close="price" low="low" high = "high"
          candleColors={{ positive: "rgb(0,215,0)", negative: "rgb(215,0,0)" }}
          />
      </VictoryChart>
    </Center>
  );
};

export default CandleChart;
