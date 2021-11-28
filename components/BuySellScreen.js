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

export default function BuySellScreen(props) {
    // const [ticker, setTicker] = React.useState(props.startPrice)
    // const startPrice = props.selectedStock.price
    let [quantity, setQuantity] = React.useState("5");
    let [price, setPrice] = React.useState("" + props.stock.price);
    return (
        <Center>
            <Column bg={"grey"} pt={5} px={5} w="100%" h="100%">
                <Row flex={1} alignItems="center">
                    <Column>
                        <Row justifyContent="center">
                            <Heading color="white">
                                Confirm Selling
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
                                selectedValue={"" + price}
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
                                <Select.Item label={"" + (price - 15)} value={"" + (price - 15)} />
                                <Select.Item label={"" + (price - 10)} value={"" + (price - 10)} />
                                <Select.Item label={"" + (price - 5 )} value={"" + (price - 5)} />
                                <Select.Item label={"" + price} value={"" + price} />
                                <Select.Item label={"" + (price + 5 )} value={"" + (price + 5)} />
                                <Select.Item label={"" + (price + 10)} value={"" + (price + 10)} />
                                <Select.Item label={"" + (price + 15)} value={"" + (price + 15)} />
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