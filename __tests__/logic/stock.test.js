import { Stock, PriceBucket, Order, OrderTicket, OrderReceipt } from "../../logic/stock";

test('creates an empty Order', () => {
    const order = Order.create();
    expect(order).toBeDefined();
    expect(order.id).toBeDefined();
    expect(order.price).toBe(0.0);
    expect(order.quantity).toBe(0.0);
});

test('creates an empty PriceBucket', () => {
    const priceBucket = new PriceBucket("GOOGL", 100.0);
    expect(priceBucket).toBeDefined();
    expect(priceBucket.symbol).toBe("GOOGL");
    expect(priceBucket.price).toBe(100.0);
    expect(priceBucket.openOrders.length).toBe(0);
});

test('places Orders into PriceBucket', () => {
    const priceBucket = new PriceBucket("GOOGL", 100.0);
    
    const firstOrder = Order.create({
        symbol: "GOOGL",
        isBuy: false,
        price: 100.0,
        quantity: 10.0
    });
    const firstOrderResult = priceBucket.process(firstOrder);
    expect(firstOrderResult.length).toBe(0);
    expect(priceBucket.isBuy).toBe(false);
    expect(priceBucket.openQuantity()).toBe(10.0);

    const secondOrder = Order.create({
        symbol: "GOOGL",
        isBuy: false,
        price: 100.0,
        quantity: 15.0
    });
    const secondOrderResult = priceBucket.process(secondOrder);
    expect(secondOrderResult.length).toBe(0);
    expect(priceBucket.isBuy).toBe(false);
    expect(priceBucket.openQuantity()).toBe(25.0);

    const thirdOrder = Order.create({
        symbol: "GOOGL",
        isBuy: true,
        price: 100.0,
        quantity: 5.0
    });
    const thirdOrderResult = priceBucket.process(thirdOrder);
    expect(thirdOrderResult.length).toBe(1);
    expect(thirdOrderResult[0].copy({id: -1, time: null}).equals(OrderReceipt.create({
        id: -1,
        symbol: "GOOGL",
        price: 100.0,
        quantity: 5.0,
        buyOrderId: thirdOrder.id,
        sellOrderId: firstOrder.id,
        isBuyFullMatch: true,
        isSellFullMatch: false,
        time: null
    }))).toBe(true);
    expect(priceBucket.isBuy).toBe(false);
    expect(priceBucket.openQuantity()).toBe(20.0);
    expect(priceBucket.matchedQuantity).toBe(5.0);

    const fourthOrder = Order.create({
        symbol: "GOOGL",
        isBuy: true,
        price: 100.0,
        quantity: 15.0
    });
    const fourthOrderResult = priceBucket.process(fourthOrder);
    expect(fourthOrderResult.length).toBe(2);
    expect(fourthOrderResult[0].copy({id: -1, time: null}).equals(OrderReceipt.create({
        id: -1,
        symbol: "GOOGL",
        price: 100.0,
        quantity: 5.0,
        buyOrderId: fourthOrder.id,
        sellOrderId: firstOrder.id,
        isBuyFullMatch: false,
        isSellFullMatch: true,
        time: null
    }))).toBe(true);
    expect(fourthOrderResult[1].copy({id: -1, time: null}).equals(OrderReceipt.create({
        id: -1,
        symbol: "GOOGL",
        price: 100.0,
        quantity: 10.0,
        buyOrderId: fourthOrder.id,
        sellOrderId: secondOrder.id,
        isBuyFullMatch: true,
        isSellFullMatch: false,
        time: null
    }))).toBe(true);
    expect(priceBucket.isBuy).toBe(false);
    expect(priceBucket.openQuantity()).toBe(5.0);
    expect(priceBucket.matchedQuantity).toBe(10.0);

    const fifthOrder = Order.create({
        symbol: "GOOGL",
        isBuy: true,
        price: 100.0,
        quantity: 15.0
    });
    const fifthOrderResult = priceBucket.process(fifthOrder);
    expect(fifthOrderResult.length).toBe(1);
    expect(fifthOrderResult[0].copy({id: -1, time: null}).equals(OrderReceipt.create({
        id: -1,
        symbol: "GOOGL",
        price: 100.0,
        quantity: 5.0,
        buyOrderId: fifthOrder.id,
        sellOrderId: secondOrder.id,
        isBuyFullMatch: false,
        isSellFullMatch: true,
        time: null
    }))).toBe(true);
    expect(priceBucket.isBuy).toBe(true);
    expect(priceBucket.openQuantity()).toBe(10.0);
    expect(priceBucket.matchedQuantity).toBe(5.0);
});

test('creates an empty Stock', () => {
    const stock = new Stock("GOOGL", "Google", null, 100.0, 99.0);
    expect(stock).toBeDefined();
    expect(stock.symbol).toBe("GOOGL");
    expect(stock.price).toBe(100.0);
    expect(stock.lastOrders.length).toBe(0);
});

test('places Orders into Stock', () => {
    const stock = new Stock("GOOGL", "Google", null, 50.0, 49.0);

    const firstOrder = Order.create({
        symbol: "GOOGL",
        isBuy: false,
        price: 100.0,
        quantity: 10.0
    });
    const firstOrderResult = stock.process(firstOrder);
    expect(firstOrderResult.length).toBe(2);
    expect(firstOrderResult[0].copy({id: -1, time: null}).equals(OrderTicket.create({
        id: -1,
        symbol: "GOOGL",
        orderId: firstOrder.id,
        isAccepted: true,
        rejectionsReason: "",
        time: null
    }))).toBe(true);    
    expect(firstOrderResult[1].length).toBe(0);
    expect(stock.getPriceBuckets()[0].price).toBe(100.0);
    expect(stock.getPriceBuckets()[0].isBuy).toBe(false);
    expect(stock.getPriceBuckets()[0].openQuantity()).toBe(10.0);
    expect(stock.price).toBe(100.0);

    const secondOrder = Order.create({
        symbol: "GOOGL",
        isBuy: false,
        price: 105.0,
        quantity: 15.0
    });
    const secondOrderResult = stock.process(secondOrder);
    expect(secondOrderResult[1].length).toBe(0);
    expect(stock.getPriceBuckets()[0].price).toBe(100.0);
    expect(stock.getPriceBuckets()[0].isBuy).toBe(false);
    expect(stock.getPriceBuckets()[0].openQuantity()).toBe(10.0);
    expect(stock.getPriceBuckets()[1].price).toBe(105.0);
    expect(stock.getPriceBuckets()[1].isBuy).toBe(false);
    expect(stock.getPriceBuckets()[1].openQuantity()).toBe(15.0);
    expect(stock.price).toBe(105.0);

    const thirdOrder = Order.create({
        symbol: "GOOGL",
        isBuy: true,
        price: 115.0,
        quantity: 40.0
    });
    const thirdOrderResult = stock.process(thirdOrder);
    expect(thirdOrderResult[1].length).toBe(2);
    expect(stock.getPriceBuckets()[0].price).toBe(115.0);
    expect(stock.getPriceBuckets()[0].isBuy).toBe(true);
    expect(stock.getPriceBuckets()[0].matchedQuantity).toBe(25.0);
    expect(stock.getPriceBuckets()[0].openQuantity()).toBe(15.0);
    expect(stock.price).toBe(115.0);
});