"use client";
import {
  Box,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
  Image,
  SystemStyleObject,
  Button,
} from "@chakra-ui/react";
import bgImage from "@/_images/hero-bg.png";
import { LogoIcon } from "@/_images/svgs/Logo";
import heroBiz1 from "@/_images/hero-biz-1.jpg";
import heroBiz2 from "@/_images/hero-biz-2.jpg";
import Link from "next/link";
import { Tooltip } from "@/_components/lib/ui/tooltip";
import CountUp from "react-countup";
import { RefObject } from "react";
// import Image from "next/image";

export const Hero = () => {
  const numberData = [
    {
      number: 500,
      unit: "k+",
      description: "Qualified young talents",
    },
    {
      number: 40,
      unit: "+",
      description: "Courses, blogs, and topics",
    },
    {
      number: 1000,
      unit: "+",
      description: "Jobs every months",
    },
  ];
  const imgStyle: SystemStyleObject = {
    boxSize: "13.4rem",
    objectFit: "cover",
    objectPosition: "right",
    borderRadius: 12,
    filter: "grayscale(100%)",
    transition: "all 0.3s",
    position: "relative",
    zIndex: 10,
    _hover: {
      filter: "grayscale(0%)",
      scale: 1.1,
    },
  };
  const boxAfterStyle: SystemStyleObject = {
    content: '""',
    position: "absolute",
    top: "-2rem",
    bg: "gray.800",
    borderRadius: 12,
    height: "70%",
    width: "70%",
    zIndex: 0,
  };

  const renderSpecialButton = (title: string, href: string) => {
    return (
      <Link href={href} style={{ border: "none" }}>
        <Button
          fontFamily="heading"
          _hover={{
            _after: {
              transform: "translateY(0%)",
            },
          }}
          overflow="hidden"
          border="none"
          _after={{
            content: `"Register NOW"`,
            height: "102%",
            w: "102%",
            bgColor: "brand.100",
            pos: "absolute",
            top: 0,
            left: 0,
            borderRadius: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translateY(100%)",
            transition: "transform 0.4s",
            transitionTimingFunction: "cubic-bezier(.28,.53,.21,1.1)",
          }}
        >
          {title}
        </Button>
      </Link>
    );
  };

  return (
    <Box>
      {/* Hero section */}
      <Box
        id="hero-section"
        bgImage={`url(${bgImage.src})`}
        bgSize="cover"
        h="32rem"
        borderRadius="2rem"
        mb="3.2rem"
        py={{ base: "2rem", md: "1rem", lg: "2.8rem" }}
        px="4rem"
      >
        <Flex w="full" justify="center">
          <LogoIcon w="11rem" height="4rem" fill="gray.800" />
        </Flex>
        <SimpleGrid columns={4} gap={4} mt={8} justifyItems="center">
          <GridItem hideBelow="md">
            <Box pos="relative" _after={{ ...boxAfterStyle, left: "-2rem" }}>
              <Image src={heroBiz1.src} alt="hero-biz-1" css={imgStyle} />
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 4, md: 2 }}>
            <Flex flexDir={"column"} align="center" h="full">
              <Text
                textStyle={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="600"
                color="gray.800"
                fontFamily="heading"
                as="h1"
                textAlign="center"
              >
                Find talents in a second
              </Text>
              <Flex
                flexDir={{ base: "column", lg: "row" }}
                mt="4.5rem"
                justify="center"
                align="center"
                gap={{ base: 4, lg: 8 }}
              >
                {renderSpecialButton(
                  "Join us as RECRUITER!",
                  "/auth/register?role=employer",
                )}
                {renderSpecialButton(
                  "Join us as JOB SEEKER?",
                  "/auth/register?role=candidate",
                )}
              </Flex>
            </Flex>
          </GridItem>
          <GridItem hideBelow="md">
            <Box pos="relative" _after={{ ...boxAfterStyle, right: "-2rem" }}>
              <Image src={heroBiz2.src} alt="hero-biz-2" css={imgStyle} />
            </Box>
          </GridItem>
        </SimpleGrid>
        <Flex justify="center" mt={{ base: "2rem", lg: "4rem" }}>
          <Tooltip
            content="Contact us via email"
            showArrow
            positioning={{ placement: "top" }}
            openDelay={100}
          >
            <Text
              as="h3"
              fontStyle="italic"
              textStyle="2xl"
              fontFamily="heading"
              cursor="pointer"
            >
              <Link href="mailto:support@talentify.vn">@Talentify</Link>
            </Text>
          </Tooltip>
        </Flex>
      </Box>
      {/* Numbers */}
      <Flex
        align="flex-start"
        flexDir={{ base: "column", lg: "row" }}
        justify="space-between"
        id="numbers-section"
      >
        <Text
          textStyle="2xl"
          fontWeight="600"
          w="17rem"
          mb={{ base: "2rem", lg: 0 }}
        >
          OUR NUMBERS TELL MORE ABOUT US
        </Text>
        <Flex gap={16} flexDir={{ base: "column", md: "row" }}>
          {numberData.map((item, index) => (
            <CountUp
              key={index}
              start={0}
              end={item.number}
              delay={0}
              duration={3 + index}
            >
              {({ countUpRef }) => (
                <Box borderLeft="4px solid" borderColor="brand.100" pl={2}>
                  <Box data-state="open">
                    <Flex align="flex-end">
                      <Text
                        ref={countUpRef as RefObject<HTMLParagraphElement>}
                        textStyle="6xl"
                        fontWeight="700"
                        color="brand.100"
                      />
                      <Text
                        textStyle="6xl"
                        fontWeight="700"
                        color="brand.100"
                        as="span"
                      >
                        {item.unit}
                      </Text>
                    </Flex>
                    <Text textStyle="sm">{item.description}</Text>
                  </Box>
                </Box>
              )}
            </CountUp>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
