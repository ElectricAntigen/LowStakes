import { Data } from "dataclass";
import { startOfToday, addDays, subDays, subMonths, subHours, subMinutes, subSeconds } from 'date-fns';

export class User extends Data {
    id = 0;
    name = "Anonymous";
    login = "Anonymous";
    password = "password"
}

let lastOrderId = 0;
export function generateOrderId() {
    return ++lastOrderId;
}
export class Order extends Data {
    id = generateOrderId();
    symbol = "UNSET";
    isBuy = true;
    price = 0.0;
    quantity = 0.0;
    userId = 0;
    time = new Date(Date.now());
}

let lastOrderTicketId = 0;
function generateOrderTicketId() {
    return ++lastOrderTicketId;
}
export class OrderTicket extends Data {
    id = generateOrderTicketId();
    symbol = "UNSET";
    orderId = -1;
    isAccepted = false;
    rejectionsReason = "";
    time = new Date(Date.now());
}

let lastOrderReceiptId = 0;
function generateOrderReceiptId() {
    return ++lastOrderReceiptId;
}
export class OrderReceipt extends Data {
    id = generateOrderReceiptId();
    symbol = "UNSET";
    price = 0.0;
    quantity = 0.0;
    buyOrderId = -1;
    sellOrderId = -1;
    isBuyFullMatch = false;
    isSellFullMatch = false;
    time = new Date(Date.now());
}

export class PriceBucket {
    constructor(symbol, price) {
        this.symbol = symbol;
        this.price = price;
    }
    isBuy = true;
    openOrders = [];
    // quantity already matched on the first openOrder
    matchedQuantity = 0.0;

    openQuantity() {
        return this.openOrders.reduce((sum, order) => sum + order.quantity, 0) - this.matchedQuantity;
    }

    // returns OrderReceipt[]
    process(order, remainingQuantity) {
        if (remainingQuantity === undefined) {
            remainingQuantity = order.quantity;
        }

        if (this.openOrders.length === 0 || order.isBuy === this.isBuy) {
            this.openOrders.push(order);
            this.isBuy = order.isBuy;
            this.matchedQuantity = order.quantity - remainingQuantity;
            return [];
        }

        let matches = [];
        while (remainingQuantity > 0 && this.openOrders.length > 0) {
            let firstOpenOrderQuantity = this.openOrders[0].quantity - this.matchedQuantity;
            let quantity = Math.min(remainingQuantity, firstOpenOrderQuantity);
            remainingQuantity -= quantity;
            this.matchedQuantity += quantity;
            matches.push(OrderReceipt.create({
                symbol: this.symbol,
                price: this.price,
                quantity: quantity,
                buyOrderId: order.isBuy ? order.id : this.openOrders[0].id,
                sellOrderId: !order.isBuy ? order.id : this.openOrders[0].id,
                isBuyFullMatch: order.isBuy ? remainingQuantity <= 0 : this.matchedQuantity >= this.openOrders[0].quantity,
                isSellFullMatch: !order.isBuy ? remainingQuantity <= 0 : this.matchedQuantity >= this.openOrders[0].quantity
            }));
            if (this.matchedQuantity >= this.openOrders[0].quantity) {
                this.matchedQuantity = 0;
                // Removes the first element
                this.openOrders.shift();
            }
        }

        if (remainingQuantity > 0) { // This means there is nothing left in openOrders
            this.isBuy = order.isBuy;
            this.openOrders.push(order);
            this.matchedQuantity = order.quantity - remainingQuantity;
        }

        return matches;
    }
}

let lastPricePointId = 0;
function generatePricePointId() {
    return ++lastPricePointId;
}
export class PricePoint extends Data {
    id = generatePricePointId();
    time = new Date(Date.now());
    price = 0.0;
    open = 0.0;
    low = 0.0;
    high = 0.0;
    prevClose = 0.0;

    get change() {
        return this.price - this.open
    }

    get changePercent() {
        return this.open === 0.0 ? this.price * 100.0 : (this.price - this.open)/this.open*100.0;
    }
}

export class HistoricalPricePoints extends Data {
    year = [];
    month = [];
    week = [];
}

export class Stock {
    symbol;
    name;
    currency = "USD";
    time = new Date();
    lastOrders = [];
    lastMatches = [];
    lastLimits = 100;
    orders = new Map();
    orderReceipts = new Map();
    buyPriceBuckets = [];
    sellPriceBuckets = [];
    currentPricePoint;
    pricePoints = [];
    historicalPricePoints;
    pricePoints10s = [];
    pricePoints30s = [];

    constructor(symbol, name, historicalPricePoints, open, prevClose) {
        this.symbol = symbol;
        this.name = name;
        if (historicalPricePoints && historicalPricePoints.year.length > 0) {
            this.currentPricePoint = historicalPricePoints.year[historicalPricePoints.year.length - 1];
        } else {
            this.currentPricePoint = PricePoint.create({
                price: open,
                open: open,
                low: open,
                high: open,
                prevClose: prevClose === undefined ? open : prevClose
            });
        }
        this.historicalPricePoints = historicalPricePoints ? historicalPricePoints : HistoricalPricePoints.create();
        this.pricePoints = [ this.currentPricePoint ];
        this.pricePoints10s = [ this.currentPricePoint ];
        this.pricePoints30s = [ this.currentPricePoint ];
    }

    get change() {
        return this.currentPricePoint.change;
    }

    get changePercent() {
        return this.currentPricePoint.changePercent;
    }

    get price() {
        return this.currentPricePoint.price;
    }

    getPriceBuckets() {
        return [... [... this.buyPriceBuckets].reverse(), ... this.sellPriceBuckets];
    }

    process(order) {
        let ticket = OrderTicket.create({
            symbol: order.symbol,
            orderId: order.id,
            isAccepted: true
        });
        this.lastOrders.push([ticket, order]);
        if (this.lastOrders.length > this.lastLimits) {
            this.lastOrders.shift();
        }

        let priceBucket = null;
        let receipts = [];
        if (order.isBuy) {
            let remainingQuantity = order.quantity;
            let popCount = 0;
            for (let i = 0; i < this.sellPriceBuckets.length; i++) {
                priceBucket = this.sellPriceBuckets[i];
                if (priceBucket.price > order.price) {
                    break;
                }
                let quantity = Math.min(remainingQuantity, priceBucket.openQuantity());
                let rec = priceBucket.process(order, quantity);
                rec.forEach(r => receipts.push(r));
                if (priceBucket.openQuantity() <= 0.0) popCount++;
                remainingQuantity -= quantity;
            }
            for (let i = 0; i < popCount; i++) this.sellPriceBuckets.shift(); // Removing empty buckets

            if (remainingQuantity > 0) { // Add remaining to a buy bucket
                let place = this.buyPriceBuckets.findIndex(pb => pb.price <= order.price);
                if (place = -1) {
                    priceBucket = new PriceBucket(this.symbol, order.price);
                    this.buyPriceBuckets.push(priceBucket);
                } else if (this.buyPriceBuckets[place].price < order.price) {
                    priceBucket = new PriceBucket(this.symbol, order.price);
                    this.buyPriceBuckets.splice(place, 0, priceBucket);
                } else {
                    priceBucket = this.buyPriceBuckets[place]; // bucket found
                }
                let rec = priceBucket.process(order, remainingQuantity);
                rec.forEach(r => receipts.push(r));
            }
        }
        else {
            let remainingQuantity = order.quantity;
            let popCount = 0;
            for (let i = 0; i < this.buyPriceBuckets.length; i++) {
                priceBucket = this.buyPriceBuckets[i];
                if (priceBucket.price < order.price) {
                    break;
                }
                let quantity = Math.min(remainingQuantity, priceBucket.openQuantity());
                let rec = priceBucket.process(order, quantity);
                rec.forEach(r => receipts.push(r));
                if (priceBucket.openQuantity() <= 0.0) popCount++;
                remainingQuantity -= quantity;
            }
            for (let i = 0; i < popCount; i++) this.buyPriceBuckets.shift(); // Removing empty buckets

            if (remainingQuantity > 0) { // Add remaining to a sell bucket
                let place = this.sellPriceBuckets.findIndex(pb => pb.price <= order.price); 
                if (place = -1) {
                    priceBucket = new PriceBucket(this.symbol, order.price);
                    this.sellPriceBuckets.push(priceBucket);
                } else if (this.sellPriceBuckets[place].price < order.price) {
                    priceBucket = new PriceBucket(this.symbol, order.price);
                    this.sellPriceBuckets.splice(place, 0, priceBucket);
                } else {
                    priceBucket = this.sellPriceBuckets[place]; // bucket found
                }
                let rec = priceBucket.process(order, remainingQuantity);
                rec.forEach(r => receipts.push(r));
            }
        }
        
        receipts.forEach(r => this.lastMatches.push(r));
        while (this.lastMatches.length > this.lastLimits) {
            this.lastMatches.shift();
        }

        let price = priceBucket.price;
        let previousPricePoint = this.currentPricePoint;
        this.currentPricePoint = PricePoint.create({
            price: price,
            open: previousPricePoint.open,
            low: Math.min(previousPricePoint.low, price),
            high: Math.max(previousPricePoint.high, price),
            prevClose: previousPricePoint.prevClose
        });
        this.pricePoints.push(this.currentPricePoint);
        this.pricePoints10s.push(this.currentPricePoint);
        this.pricePoints30s.push(this.currentPricePoint);
        if (this.pricePoints10s[0].time.getTime() < subSeconds(new Date(Date.now()), 10)) this.pricePoints10s.shift();
        if (this.pricePoints30s[0].time.getTime() < subSeconds(new Date(Date.now()), 30)) this.pricePoints30s.shift();

        this.orders.set(order.id, [order, ticket]);
        this.orderReceipts.set(order.id, []);
        receipts.forEach(r => {
            this.orderReceipts.get(r.buyOrderId).push(r);
            this.orderReceipts.get(r.sellOrderId).push(r);
        });

        return [ticket, receipts];
    }
};
