import moment from "moment";
import * as React from "react";
import ChartScreen from "./ChartScreen"

const data = []

function addPoint(isHistory, startPrice) {
    const lastPoint = data[data.length-1]
    const delta = lastPoint.ticker > startPrice / 2 && lastPoint.ticker < startPrice * 1.5
        ? lastPoint.ticker/startPrice/2
        : 0.5
    const newTicker = lastPoint.ticker + Math.round((Math.random() - delta) * 1000)/100
    const d = new Date(lastPoint.time)
    if (isHistory) {
        d.setMinutes(d.getMinutes()+1)
    } else {
        d.setSeconds(d.getSeconds()+1)
    }
    data.push({
        ticker: newTicker, 
        time: d,
        high: newTicker > lastPoint.high ? newTicker : lastPoint.high,
        low: newTicker < lastPoint.low ? newTicker : lastPoint.low})
    return newTicker
}

function addPoints(startPrice) {
    while (data[data.length-1].time.getTime() < Date.now()) {
        addPoint(true, startPrice)
    }
}

export default function Generator(props) {
    const [ticker, setTicker] = React.useState(props.startPrice)

    React.useEffect(() => {
        const d = new Date(Date.now())
        d.setHours(8,0,0,0)
        console.log(d)
        data.push({ticker, time: d, high: ticker, low: ticker})
        addPoints(props.startPrice)
        setTicker(data[data.length-1])
        const interval = setInterval(() => {
            setTicker(() => addPoint(false, props.startPrice));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ChartScreen openPage = {props.openPage} data = {data}/>
    )
}