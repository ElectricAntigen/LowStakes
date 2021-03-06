import { Data } from "dataclass";
import { startOfToday, addDays, subDays, subMonths, subHours, subMinutes, subSeconds } from 'date-fns';
<<<<<<< HEAD
import { InteractionManager } from "react-native";
=======
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
import { PricePoint, HistoricalPricePoints, Stock, Order } from "./stock.js";
('date-fns/startOfToday')


function newPoint(lastPoint, startPrice) {
    const delta = lastPoint.price > startPrice / 2 && lastPoint.price < startPrice * 1.5
        ? lastPoint.price/startPrice/2
        : 0.5
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
    var price = Math.abs((delta < 5) 
        ? lastPoint.price + Math.round((Math.random() - delta) * 1000)/10
        : lastPoint.price + Math.round((Math.random()) * 1000)/10);

    var high = Math.max(lastPoint.price, price) + Math.round(Math.random(Math.random() * delta * 1000)) / 100;
    var low = Math.min(lastPoint.price, price) - Math.round(Math.random(Math.random() * delta * 1000)) / 100;
<<<<<<< HEAD
=======
=======
    var price = (delta < 5) 
        ? lastPoint.price + Math.round((Math.random() - delta) * 1000)/100
        : lastPoint.price + Math.round((Math.random()) * 1000)/100;
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
    
    const d = addDays(new Date(lastPoint.time), 1);
    return PricePoint.create({
        time: d,
        open: lastPoint.price,
        price: price,
<<<<<<< HEAD
        high: high,
        low: low,
=======
<<<<<<< HEAD
        high: high,
        low: low,
=======
        high: price > lastPoint.high ? price : lastPoint.high,
        low: price < lastPoint.low ? price : lastPoint.low,
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
        prevClose: lastPoint.price
    })
}

function addPoints(data, startPrice, endDate) {
    while (data[data.length-1].time.getTime() < endDate.getTime()) {
        data.push(newPoint(data[data.length-1], startPrice));
    }
}

function generateHistorical(startPrice, startDate, endDate) {
    const firstPoint = PricePoint.create({
        time: startDate,
        price: startPrice,
        open: startPrice,
        low: startPrice,
        high: startPrice,
        prevClose: startPrice
    });
    let data = [ firstPoint ];
    addPoints(data, startPrice, endDate);
    return data;
}

export function generateLastYear(startPrice) {
    return generateHistorical(startPrice, subDays(startOfToday(), 365), startOfToday());
}

export function getLastMonths(data, n) {
    const fromDate = subMonths(startOfToday(), n);
    return data.filter(d => d.time.getTime() >= fromDate.getTime());
}

export function getLastWeek(data) {
    const fromDate = subDays(startOfToday(), 6);
    return data.filter(d => d.time.getTime() >= fromDate.getTime());
}

export function getLastHour(data) {
    const fromDate = subHours(startOfToday(), 1);
    return data.filter(d => d.time.getTime() >= fromDate.getTime());
}

export function generateHistory(startPrice) {
    const year = generateLastYear(startPrice);
    return HistoricalPricePoints.create({
        year: year,
        month3: getLastMonths(year, 3),
        month: getLastMonths(year, 1),
        week: getLastWeek(year)
    });
}

export class StockInfo extends Data {
    symbol ="UNSET";
    name = "Noname";
    price = "USD";
}

export class Exchange {
    stocks;
    simulate;
    constructor(stockInfos, interval, simulate) {
        this.stocks = stockInfos.map(si => new Stock(si.symbol, si.name, generateHistory(si.price)));
        this.simulate = simulate;
<<<<<<< HEAD
        this.simulationLoop = 
            setInterval(() => {
                try {
                    if (this.simulate) {
                        InteractionManager.runAfterInteractions(() => 
                            this.stocks.forEach(stock => this.randomOrder(stock)));
=======
<<<<<<< HEAD
        this.simulationLoop = setTimeout(() => { 
            setInterval(() => {
                try {
                    if (this.simulate) {
                        this.stocks.forEach(stock => this.randomOrder(stock));
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
                    }
                }
                catch (e) {
                }
            }, interval);
<<<<<<< HEAD
=======
        }, 1000);
=======
        this.simulationLoop = setInterval(() => {
            if (this.simulate) {
                this.stocks.forEach(stock => this.randomOrder(stock));
            }
        }, interval);
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
    }

    stock(symbol) {
        return this.stocks.find(s => s.symbol === symbol);
    }

    randomOrder(stock) {
        const step = Math.round(Math.random() * 1000.0) / 100.0;
<<<<<<< HEAD
        const price = Math.abs(stock.price > 10.0 ? stock.price + step - 5.0 : stock.price + step);
=======
<<<<<<< HEAD
        const price = Math.abs(stock.price > 10.0 ? stock.price + step - 5.0 : stock.price + step);
=======
        const price = stock.price > 10.0 ? stock.price + step - 5.0 : stock.price + step;
>>>>>>> 6f627ae86ceabb858120fa9e059d8b5c2612e413
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
        const isBuy = Math.random() < 0.5;
        const quantity = Math.round(Math.random() * 20); 
        const order = Order.create({
            symbol: stock.symbol,
            isBuy: isBuy,
            price: price,
            quantity: quantity
        });
        return stock.process(order);
    }
}