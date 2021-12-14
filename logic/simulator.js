import { Data } from "dataclass";
import { startOfToday, addDays, subDays, subMonths, subHours, subMinutes, subSeconds } from 'date-fns';
import { InteractionManager } from "react-native";
import { PricePoint, HistoricalPricePoints, Stock, Order } from "./stock.js";
('date-fns/startOfToday')


function newPoint(lastPoint, startPrice) {
    const delta = lastPoint.price > startPrice / 2 && lastPoint.price < startPrice * 1.5
        ? lastPoint.price/startPrice/2
        : 0.5
    var price = Math.abs((delta < 5) 
        ? lastPoint.price + Math.round((Math.random() - delta) * 1000)/10
        : lastPoint.price + Math.round((Math.random()) * 1000)/10);

    var high = Math.max(lastPoint.price, price) + Math.round(Math.random(Math.random() * delta * 1000)) / 100;
    var low = Math.min(lastPoint.price, price) - Math.round(Math.random(Math.random() * delta * 1000)) / 100;
    
    const d = addDays(new Date(lastPoint.time), 1);
    return PricePoint.create({
        time: d,
        open: lastPoint.price,
        price: price,
        high: high,
        low: low,
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
        this.simulationLoop = 
            setInterval(() => {
                try {
                    if (this.simulate) {
                        InteractionManager.runAfterInteractions(() => 
                            this.stocks.forEach(stock => this.randomOrder(stock)));
                    }
                }
                catch (e) {
                }
            }, interval);
    }

    stock(symbol) {
        return this.stocks.find(s => s.symbol === symbol);
    }

    randomOrder(stock) {
        const step = Math.round(Math.random() * 1000.0) / 100.0;
        const price = Math.abs(stock.price > 10.0 ? stock.price + step - 5.0 : stock.price + step);
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