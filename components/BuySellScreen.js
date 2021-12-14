import * as React from "react";
import {
    Box,
    Text,
    Button,
    Row,
    Center,
    Heading,
    Column,
    useToast,
    Select,
    CheckIcon,
  } from "native-base";
<<<<<<< HEAD
import { Order } from "../logic/stock";
=======

const OkButton = (props) => {
    const toast = useToast();
    return <Button
      flexGrow={1}
      borderRadius={0}
      px={0}
      py={2}
      onPress={() => {
        const order = Order.create({
            symbol: props.stock.symbol,
            isBuy: isBuy,
            price: price,
            quantity: quantity
        });
          toast.show({
            description: `Order submitted`,
          });
          setTimeout(() => props.navigation.goBack(), 5000);
        }
      }
      bg="rgb(0,215,0)"
      w="50%"
    >
      OK
    </Button>
  };

  const CancelButton = (props) => (
    <Button
      flexGrow={1}
      borderRadius={0}
      px={0}
      py={2}
      onPress={() => props.navigation.goBack()}
      bg="rgb(215,0,0)"
      w="50%"
    >
      Cancel
    </Button>
  );
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136

export default function BuySellScreen(props) {
    // const [ticker, setTicker] = React.useState(props.startPrice)
    // const startPrice = props.selectedStock.price
    let [quantity, setQuantity] = React.useState("5");
<<<<<<< HEAD
    let selectedStock = props.route.params.selectedStock;
    let [price, setPrice] = React.useState(props.route.params.price);

    const OkButton = (props) => {
      const toast = useToast();
      return <Button
        flexGrow={1}
        borderRadius={0}
        px={0}
        py={2}
        onPress={() => {
            const order = Order.create({
                symbol: props.route.params.stock.symbol,
                isBuy: props.route.params.isBuy,
                price: price,
                quantity: quantity
            });
            const [ticket, receipts] = props.route.params.stock.process(order);
            console.log(ticket)
            toast.show({
              description: `Order submitted\n
              Order Id: ${ticket.orderId}
              Ticket Id: ${ticket.id}
              Price: ${order.price.toFixed(2)}
              Quantity: ${order.quantity}
              Time: ${ticket.time.toString()}
              `,
            });
            setTimeout(() => props.navigation.goBack(), 5000);
          }
        }
        bg="rgb(0,215,0)"
        w="50%"
      >
        OK
      </Button>
    };
  
    const CancelButton = (props) => (
      <Button
        flexGrow={1}
        borderRadius={0}
        px={0}
        py={2}
        onPress={() => props.navigation.goBack()}
        bg="rgb(215,0,0)"
        w="50%"
      >
        Cancel
      </Button>
    );

=======
    let [price, setPrice] = React.useState("" + props.stock.price);
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
    return (
        <Center>
            <Column bg={"grey"} pt={5} px={5} w="100%" h="100%">
                <Row flex={1} alignItems="center">
                    <Column>
                        <Row justifyContent="center">
                            <Heading color="white">
<<<<<<< HEAD
                                Confirm {props.route.params.isBuy ? "Buying" : "Selling"}
=======
                                Confirm Selling
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
                            </Heading>
                        </Row>
                        <Row pt={5} justifyContent="center">
                            <Select
                                selectedValue={quantity}
                                minWidth="200"
                                // accessibilityLabel="Choose Service"
                                // placeholder="Choose Service"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={(itemValue) => setQuantity(itemValue)}
                                color="white"
                            >
                                <Select.Item label="5" value="5" />
                                <Select.Item label="10" value="10" />
                                <Select.Item label="15" value="15" />
                                <Select.Item label="20" value="20" />
                                <Select.Item label="50" value="50" />
                            </Select>
                        </Row>
                        <Row pt={5} justifyContent="center">
                            <Select
<<<<<<< HEAD
                                selectedValue={price.toFixed(2)}
=======
                                selectedValue={"" + price}
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
                                minWidth="200"
                                // accessibilityLabel="Choose Service"
                                // placeholder="Choose Service"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
<<<<<<< HEAD
                                onValueChange={(itemValue) => setPrice(parseInt(itemValue))}
                                color="white"
                            >
                                <Select.Item label={(price - 15).toFixed(2)} value={(price - 15).toFixed(2)} />
                                <Select.Item label={(price - 10).toFixed(2)} value={(price - 10).toFixed(2)} />
                                <Select.Item label={(price - 5 ).toFixed(2)} value={(price - 5 ).toFixed(2)} />
                                <Select.Item label={price.toFixed(2)} value={price.toFixed(2)} />
                                <Select.Item label={(price + 5 ).toFixed(2)} value={(price + 5 ).toFixed(2)} />
                                <Select.Item label={(price + 10).toFixed(2)} value={(price + 10).toFixed(2)} />
                                <Select.Item label={(price + 15).toFixed(2)} value={(price + 15).toFixed(2)} />
=======
                                onValueChange={(itemValue) => setQuantity(itemValue)}
                                color="white"
                            >
                                <Select.Item label={"" + (price - 15)} value={"" + (price - 15)} />
                                <Select.Item label={"" + (price - 10)} value={"" + (price - 10)} />
                                <Select.Item label={"" + (price - 5 )} value={"" + (price - 5)} />
                                <Select.Item label={"" + price} value={"" + price} />
                                <Select.Item label={"" + (price + 5 )} value={"" + (price + 5)} />
                                <Select.Item label={"" + (price + 10)} value={"" + (price + 10)} />
                                <Select.Item label={"" + (price + 15)} value={"" + (price + 15)} />
>>>>>>> b9649a8f01f647f4b84b28a62b6b3db246b81136
                            </Select>
                        </Row>
                        <Row pt={5}>
                            <OkButton {...props} quantity={quantity} />
                            <CancelButton {...props} />
                        </Row>
                    </Column>
                </Row>
            </Column>
        </Center>
    )
}