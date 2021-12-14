import * as React from "react";
import ChartScreen from "./ChartScreen"

const data = []

function addPoint(unit, startPrice) {
    const lastPoint = data[data.length-1]
    const delta = lastPoint.ticker > startPrice / 2 && lastPoint.ticker < startPrice * 1.5
        ? lastPoint.ticker/startPrice/2
        : 0.5
    var newTicker = 0
    if (delta < 5) {
        newTicker = lastPoint.ticker + Math.round((Math.random() - delta) * 1000)/100
    } else {
        newTicker = lastPoint.ticker + Math.round((Math.random()) * 1000)/100
    }
    const d = new Date(lastPoint.time)
    switch (unit) {
        case 'm':
            d.setMinutes(d.getMinutes()+1)
            break
        case 's':
            d.setSeconds(d.getSeconds()+1)
            break
        case 'd':
            d.setDate(d.getDate()+1)
            break
    }
    data.push({
        ticker: newTicker, 
        time: d,
        high: newTicker > lastPoint.high ? newTicker : lastPoint.high,
        low: newTicker < lastPoint.low ? newTicker : lastPoint.low,
        open: lastPoint.ticker,
        // close: newTicker
    })
    return newTicker
}

function addPoints(startPrice) {
    while (data[data.length-1].time.getTime() < Date.now()) {
        addPoint('m', startPrice)
    }
}

export default function Generator(props) {
    const [ticker, setTicker] = React.useState(props.startPrice)
    const startPrice = props.selectedStock.price

    React.useEffect(() => {
        const d = new Date(Date.now())
        d.setHours(8,0,0,0)
        data.push({ticker, time: d, high: ticker, low: ticker})
        addPoints(props.startPrice)
        setTicker(data[data.length-1])
        const interval = setInterval(() => {
            setTicker(() => addPoint('s', startPrice));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ChartScreen data = {data} compData = {props.compData}
        selectedStock = {props.selectedStock}/>
    )
}