import React from "react";
import {
  Center,
} from "native-base";
import { //Importing all necessary resources from victory native.
  VictoryChart,
  VictoryTheme,
  VictoryLine,
} from "victory-native";

const LineChart = (props) => { //Defining the display of the graph.
  return (
    <Center flex={1} bg="grey">
<<<<<<< HEAD
      <VictoryChart width={400} height={400} theme={VictoryTheme.material} scale={{x: "time"}}>
=======
      <VictoryChart width={400} height={400} theme={VictoryTheme.material}>
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
        <VictoryLine data={props.data} x="time" y="price" />
      </VictoryChart>
    </Center>
  );
};

export default LineChart; //Returning the chart.
