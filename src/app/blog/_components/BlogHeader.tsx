"use client";
import { StarLogoIcon } from "@/_images/svgs/Logo";
import {
  Container,
  Flex,
  HStack,
  Icon,
  Separator,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBox } from "./SearchBox";

export const BlogHeader = () => {
  const pathName = usePathname();
  const listItems = [
    { name: "career", href: "/blog/career" },
    { name: "skills station", href: "/blog/skill-station" },
    { name: "podcasts", href: "/blog/podcasts" },
  ];

  const renderLogo = () => {
    return (
      <Link href="/blog" style={{ borderBottom: "none" }}>
        <Flex cursor={"pointer"}>
          <Text textStyle="3xl" fontFamily="heading" fontWeight={600}>
            Opportunities
          </Text>
          <Icon boxSize={5}>
            <StarLogoIcon fill="brand.100" />
          </Icon>
        </Flex>
      </Link>
    );
  };
  return (
    <Flex as="header">
      <Container maxW="full">
        <Flex justify="space-between" py={4}>
          <HStack gap={6}>
            {renderLogo()}
            <Separator
              orientation="vertical"
              height="2rem"
              borderColor="gray.400"
            />
            {listItems.map((item, index) => (
              <Link href={item.href} key={index}>
                <Text
                  key={index}
                  textTransform="uppercase"
                  color={pathName === item.href ? "brand.200" : "inherit"}
                  fontWeight={pathName === item.href ? "bold" : "normal"}
                  cursor="pointer"
                >
                  {item.name}
                </Text>
              </Link>
            ))}
          </HStack>
          <SearchBox />
        </Flex>
      </Container>
    </Flex>
  );
};
