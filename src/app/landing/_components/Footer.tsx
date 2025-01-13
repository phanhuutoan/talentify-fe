"use client";
import { LogoIcon } from "@/_images/svgs/Logo";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box as="footer" mb="4rem">
      <Flex align="center">
        <Box py={0} px={8} bgColor="gray.800" mr="1rem" borderRadius="lg">
          <LogoIcon fill="white" w="8rem" h="3rem" />
        </Box>
        <Separator orientation="horizontal" borderColor="gray.600" />
      </Flex>
      <Flex mt="1.5rem">
        <Box mr="4rem">
          <Text textStyle="2xl" fontWeight="600">
            About
          </Text>
          <VStack gap={2} align="flex-start" mt={4}>
            <Link href="#" style={{ border: "none" }}>
              <Text>Information</Text>
            </Link>
            <Link href="#" style={{ border: "none" }}>
              <Text>Support</Text>
            </Link>
            <Link href="#" style={{ border: "none" }}>
              <Text>Term of services</Text>
            </Link>
          </VStack>
        </Box>
        <Box>
          <Text textStyle="2xl" fontWeight="600">
            Contact us
          </Text>
          <HStack mt={2} gap={4}>
            <Link href="#" style={{ border: "none" }}>
              <Icon fill="brand.100" boxSize="2.5rem">
                <FaFacebookSquare />
              </Icon>
            </Link>
            <Link href="#" style={{ border: "none" }}>
              <Icon fill="brand.100" boxSize="2.5rem">
                <FaLinkedin />
              </Icon>
            </Link>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};
