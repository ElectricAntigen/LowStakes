import * as React from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
} from "native-base";

export default function Login(props) {
  return (
    <Box safeArea flex={1} bg={"grey"} p={2} w="90%" mx="auto">
      <Heading size="lg" color="primary.500">
        Welcome 
      </Heading>
      <Heading color="muted.400" size="xs">
        Sign in to continue!
      </Heading>

      <VStack space={2} mt={5}>
        <FormControl>
          <FormControl.Label
            _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
          >
            Email ID
          </FormControl.Label>
          <Input />
        </FormControl>
        <FormControl mb={5}>
          <FormControl.Label
            _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
          >
            Password
          </FormControl.Label>
          <Input type="password" />
        </FormControl>
        <VStack space={2}>
          <Button
            colorScheme="cyan"
            _text={{ color: "white" }}
            onPress={() => props.openPage({page: "mainScreen", selectedStock: null})}
          >
            Login
          </Button>

          <HStack justifyContent="center" alignItem="center">
            <IconButton
              variant="unstyled"
              startIcon={
                <Icon
                  as={<MaterialCommunityIcons name="facebook" />}
                  color="muted.700"
                  size="sm"
                />
              }
            />
            <IconButton
              variant="unstyled"
              startIcon={
                <Icon
                  as={<MaterialCommunityIcons name="google" />}
                  color="muted.700"
                  size="sm"
                />
              }
            />
            <IconButton
              variant="unstyled"
              startIcon={
                <Icon
                  as={<MaterialCommunityIcons name="github" />}
                  color="muted.700"
                  size="sm"
                />
              }
            />
          </HStack>
        </VStack>
        <HStack justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            I'm a new user.{" "}
          </Text>
          <Link
            _text={{ color: "cyan.500", bold: true, fontSize: "sm" }}
            onPress={() => props.openPage({page: "signUp"})}
          >
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
