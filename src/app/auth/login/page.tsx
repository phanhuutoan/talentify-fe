"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/_components/ui/Button";
import { Center, Text, VStack } from "@chakra-ui/react";

const Page = () => {
  return (
    <Center mt={20}>
      <VStack>
        <Text textStyle="xl" fontWeight={500}>
          Login Page
        </Text>
        <Button>Click me</Button>
        <Text
          bgColor={"red.400"}
          p="4px 15px"
          cursor="pointer"
          color="white"
          borderRadius="5px"
          transition={"all 0.3s"}
          _hover={{
            bgColor: "blue.500",
            transform: "scale(1.1)",
            boxShadow: "md",
          }}
        >
          Hello world
        </Text>
        <Text textStyle="7xl" bgColor="brand.200">
          Hello super worlds
        </Text>
      </VStack>
    </Center>
  );
};

export default Page;
