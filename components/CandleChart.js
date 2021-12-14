import React from "react";
import {
  Center,
} from "native-base";
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
<<<<<<< HEAD
      <VictoryChart width={350} height={400} theme={VictoryTheme.material} scale={{x: "time"}} > 
        <VictoryCandlestick data={props.data} x="time" open="open" close="price" low="low" high = "high"
          candleColors={{ positive: "rgb(0,215,0)", negative: "rgb(215,0,0)" }}
          />
=======
      <VictoryChart width={350} height={500} theme={VictoryTheme.material}>
        <VictoryCandlestick data={props.data} x="time" open="open" close="price" low="low" high = "high"/>
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
      </VictoryChart>
    </Center>
  );
};

export default CandleChart;
