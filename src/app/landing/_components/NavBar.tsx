"use client";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Separator,
  SystemStyleObject,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import TextLogo from "@/_images/text-logo.png";
import Link from "next/link";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/_components/lib/ui/drawer";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export const NavBar = () => {
  const linkItems = [
    {
      title: "jobs",
      url: "/#jobs",
    },
    {
      title: "companies",
      url: "/#companies",
    },
    {
      title: "blog",
      url: "/blog",
    },
    {
      title: "learning",
      url: "/#learning",
    },
  ];
  const buttonStyle: SystemStyleObject = {
    textTransform: "uppercase",
    colorPalette: "brand",
    fontFamily: "heading",
    fontSize: "md",
    transition: "all 0.3s",
    _hover: {
      transform: "translateY(-2px)",
      boxShadow: "sm",
    },
    "& a": {
      textDecoration: "none",
    },
  };
  const [open, setOpen] = useState(false);
  const renderNavItems = () => {
    return linkItems.map((item, index) => (
      <Box
        key={index}
        mt="1"
        position="relative"
        _after={{
          content: '""',
          height: "4px",
          width: "0%",
          bg: "brand.100",
          position: "absolute",
          bottom: -1,
          left: 0,
          transition: "width 0.3s",
        }}
        _hover={{ _after: { width: "110%" } }}
      >
        <Link href={item.url}>
          <Text textTransform="uppercase">{item.title}</Text>
        </Link>
      </Box>
    ));
  };

  const renderAuthButtons = () => {
    return (
      <>
        <Button size="sm" css={buttonStyle} variant="outline">
          <Link href="/auth/register">Register</Link>
        </Button>
        <Button size="sm" css={buttonStyle}>
          <Link style={{ color: "white" }} href="/auth/login">
            Login
          </Link>
        </Button>
        <Separator
          orientation="vertical"
          borderColor="brand.100"
          height={6}
          size="md"
          hideBelow="lg"
        />
        <Button size="sm" css={buttonStyle}>
          <Link style={{ color: "white" }} href="/auth/register?role=employer">
            For employer
          </Link>
        </Button>
      </>
    );
  };

  return (
    <Flex as="nav" alignItems="center" justifyContent="space-between" py={6}>
      <HStack gap={8} align="center">
        <Box
          _hover={{ transform: "rotate(-20deg) scale(1.2)" }}
          transition="all 0.3s"
          cursor={"pointer"}
        >
          <Link href="/#">
            <Image src={TextLogo} alt="logo" width={130} height={130} />
          </Link>
        </Box>
        <Flex gap={8} align="center" hideBelow={"lg"}>
          {renderNavItems()}
        </Flex>
      </HStack>
      <HStack gap={4} css={{ "& a": { borderBottom: "none" } }} hideBelow="lg">
        {renderAuthButtons()}
      </HStack>
      {/* Responsive menu */}
      <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm" hideFrom="lg" borderRadius={2}>
            <Icon boxSize={8} fill="brand.100">
              <GiHamburgerMenu />
            </Icon>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <VStack gap={4} align="flex-start">
              {renderNavItems()}
              <Separator orientation="horizontal" borderColor="gray.300" />
              {renderAuthButtons()}
            </VStack>
          </DrawerBody>

          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </Flex>
  );
};
