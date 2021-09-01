import moment from "moment";
import * as React from "react";
import ChartScreen from "./ChartScreen"

const data = []

function addPoint() {
    const newTicker = data[data.length-1].ticker + Math.round((Math.random() - 0.5) * 1000)/100
    const d = new Date(data[data.length-1].time)
    d.setMinutes(d.getMinutes()+1)
    data.push({ticker: newTicker, time: d})
    return newTicker
}

function addPoints() {
    while (data[data.length-1].time < new Date(Date.now())) {
        addPoint()
    }
}

export default function Generator(props) {
    const [ticker, setTicker] = React.useState(props.startPrice)

    React.useEffect(() => {
        const d = new Date(Date.now())
        d.setHours(8,0,0,0)
        data.push({ticker, time: d})
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