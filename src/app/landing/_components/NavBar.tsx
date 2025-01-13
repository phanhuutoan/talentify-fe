import {
  Box,
  Button,
  Flex,
  HStack,
  Separator,
  SystemStyleObject,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import TextLogo from "@/_images/text-logo.png";
import Link from "next/link";

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
      url: "/blogs",
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
        {linkItems.map((item, index) => (
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
        ))}
      </HStack>
      <HStack gap={4} css={{ "& a": { borderBottom: "none" } }}>
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
        />
        <Button size="sm" css={buttonStyle}>
          <Link style={{ color: "white" }} href="/auth/register?role=employer">
            For employer
          </Link>
        </Button>
      </HStack>
    </Flex>
  );
};
