import moment from "moment";
import * as React from "react";
import ChartScreen from "./ChartScreen"

const data = []

function addPoint() {
    const newTicker = data[data.length-1] + Math.round((Math.random() - 0.5) * 1000)/100
    data.push(newTicker)
    return newTicker
}

function addPoints(n) {
    for (let i = 0; i < n; i++) {
        addPoint()
    }
}

export default function Generator(props) {
    const [ticker, setTicker] = React.useState(props.startPrice)

    React.useEffect(() => {
        data.push(ticker)
        addPoints(props.quantity)
        setTicker(data[data.length-1])
        const interval = setInterval(() => {
            setTicker(addPoint);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ChartScreen openPage = {props.openPage} data = {data}/>
    )
}