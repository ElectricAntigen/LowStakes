import { Exchange, generateHistory, generateLastYear } from "../../logic/simulator";

test('generate Last Year prices', () => {
    const prices = generateLastYear(100.0);

    expect(prices.length).toBe(366);
});

test('generate History', () => {
    const history = generateHistory(100.0);

    expect(history.year.length).toBe(366);
    expect(history.month.length).toBe(31);
    expect(history.week.length).toBe(7);
});

test('createExchange', () => {
    const exchange = new Exchange([
        { symbol: "AMAZ", name: "Amazon.com, Inc.", price: 3446.57 },
        { symbol: "AMD", name: "Advanced Micro Devices, Inc.", price: 121.16 },
        { symbol: "AAPL", name: "Apple, Inc.", price: 152.57 }, 
        { symbol: "BP", name: "British Petroleum plc", price: 353.15 },
        { symbol: "CAJ", name: "Canon, Inc.", price: 22.49 },
        { symbol: "DAL", name: "Delta Air Lines, Inc.", price: 39.05 },
        { symbol: "XOM", name: "Exxon Mobil Corporation", price: 63.88 },
        { symbol: "FB", name: "Facebook, Inc.", price: 315.44 },
        { symbol: "GME", name: "GameStop Corp.", price: 180.58 },
    ], 100);

    expect(exchange).toBeDefined();

    // exchange.simulate = true;
    // setTimeout(() => { exchange.simulate = false; }, 1000);
    
    console.log(exchange.stock("AMD").price);
    console.log(exchange.randomOrder(exchange.stock("AMD")));
    console.log(exchange.stock("AMD").price);
});
