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
  const [user, setUser] = React.useState({ userId: "maxym", pwd: "password", showPwd: false })
  return (
    <Box safeArea flex={1} bg={"grey"} p={2} w="100%" mx="auto">
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
            User ID
          </FormControl.Label>
          <Input value={user.userId} onChangeText={t => setUser({...user, userId: t})}
            color="white"
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="account" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }/>
        </FormControl>
        <FormControl mb={5}>
          <FormControl.Label
            _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
          >
            Password
          </FormControl.Label>
          <Input onChangeText={t => setUser({...user, pwd: t})}
            type={user.showPwd ? "text" : "password"}
            color="white"
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="eye-off" onPress={() => setUser({...user, showPwd: !user.showPwd})} />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Password"
            value={user.pwd} />
        </FormControl>
        <VStack space={2}>
          <Button
            colorScheme="cyan"
            _text={{ color: "white" }}
            onPress={() => props.navigation.navigate("mainScreen")}
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
            onPress={() => props.navigation.navigate("signUp")}
          >
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
