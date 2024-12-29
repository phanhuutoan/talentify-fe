"use client";

import { style } from "@/_styles/style";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Image,
  Link,
  HStack,
  Container,
} from "@chakra-ui/react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";

const images = [
  "https://firebasestorage.googleapis.com/v0/b/veetee-cms.appspot.com/o/images%2FIMG_2786.jpegfffaf7fe-6059-4a3b-8c4c-a477930b9ed1?alt=media&token=31d813cd-f1fb-4de1-aff7-09a8deb5ca97",
  "https://firebasestorage.googleapis.com/v0/b/veetee-cms.appspot.com/o/images%2FIMG_2790.jpegdd5e6c2f-f434-4674-a245-6d7a68e897b6?alt=media&token=f4e21a09-022a-47d2-b485-cc7cde267aee",
  "https://firebasestorage.googleapis.com/v0/b/veetee-cms.appspot.com/o/images%2FDSC06326.jpgf0457c11-379f-4a4b-b527-2e397fcce53e?alt=media&token=b7658c56-b2a5-462c-a0c5-01c7bf655827",
  "https://firebasestorage.googleapis.com/v0/b/veetee-cms.appspot.com/o/images%2FIMG_0983.jpeg0cb5a0a0-ed59-4c44-953b-abed413c66ad?alt=media&token=e558cf52-d4cc-4e50-87bf-ba95db9fe524",
  "https://firebasestorage.googleapis.com/v0/b/veetee-cms.appspot.com/o/images%2Fmoney-3.pngcf806874-71d5-4998-a7d1-374d0d1574c5?alt=media&token=52bf2cc5-d49a-49d4-b49c-59a4b4c43ca8",
];

export default function HomePage() {
  return (
    <>
      <Box
        fontFamily={style.fonts.body}
        color={style.colors.text}
        minHeight="100vh"
      >
        {/* Navbar */}
        <Container key={"xl"}>
          <Flex
            as="nav"
            justify="space-between"
            align="center"
            px={10}
            py={5}
            // boxShadow="md"
            bg="white"
          >
            <Heading
              fontFamily={style.fonts.heading}
              color={style.colors.primary}
              size="md"
            >
              Talentify
            </Heading>
            <HStack spaceX={8}>
              <Link href="#">Home</Link>
              <Link href="#job-board">Job Board</Link>
              <Link href="#tool">Tool</Link>
              <Link href="#community">Talent Community</Link>
              <Link href="#plan">Plan</Link>
            </HStack>
            <Button
              variant="outline"
              colorScheme="orange"
              rounded="full"
              _hover={{ bg: style.colors.primary, color: style.colors.white }}
            >
              Login
            </Button>
          </Flex>
        </Container>

        {/* Hero Section */}
        <Box position="relative" w="full" py={12} bg="" overflow="hidden">
          {/* Effect */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="500px"
            h="500px"
            borderRadius="full"
            bgGradient="radial-gradient(circle, rgba(255,165,0,0.4) 0%, rgba(255,165,0,0) 70%)"
            zIndex={0}
          />

          {/* Content */}
          <Flex
            direction="column"
            align="center"
            textAlign="center"
            position="relative"
            zIndex={1}
            gap={6}
          >
            <Text maxW="600px" my={6} fontSize={14}>
              REVOLUTIONIZING THE WAY TALENT MEETS OPPORTUNITY
            </Text>
            <Heading
              fontSize="6xl"
              fontFamily={style.fonts.heading}
              my={12}
              letterSpacing={2}
            >
              Talentify is here
              <Text
                as="span"
                fontSize="7xl"
                display="block"
                color={style.colors.primary}
                py={16}
                fontFamily={style.fonts["poetsen-one-regular"]}
              >
                redefine
              </Text>
              <Text as="span" fontSize="6xl" display="block">
                the future of work
              </Text>
            </Heading>
            <Text maxW="600px" mb={6}>
              Discover a smarter, faster, and more personalized approach to
              recruitment and job searching.
            </Text>
            <HStack spaceX={4}>
              <Button
                bg="slate-600"
                rounded="full"
                _hover={{ bg: style.colors.buttonHover }}
              >
                Start Your Opportunity
              </Button>
              <Button
                variant="outline"
                rounded="full"
                colorScheme="orange"
                _hover={{ bg: style.colors.primary, color: style.colors.white }}
              >
                Learn More
              </Button>
            </HStack>
          </Flex>
        </Box>

        {/* Stats Section */}
        <HStack justify="center" spaceX={80} pb={24} pt={18}>
          <Box rotate="4deg">
            <Flex
              gap={4}
              alignItems="center"
              rounded="full"
              shadow="md"
              px="12px"
              py="6px"
            >
              <IoBriefcaseOutline size={24} />
              <Text
                fontSize="2xl"
                fontWeight="bold"
                rounded="full"
                color={style.colors.primary}
              >
                20,000+
              </Text>
              <Text>Opportunities every day</Text>
            </Flex>
          </Box>

          <Box rotate="-2deg">
            <Flex
              gap={4}
              textAlign="center"
              alignItems="center"
              rounded="full"
              shadow="md"
              px="12px"
              py="6px"
            >
              <TbReportMoney size={24} />
              <Text
                fontSize="2xl"
                fontWeight="bold"
                rounded="full"
                color={style.colors.primary}
              >
                $15,000+
              </Text>
              <Text>Average Salary in Viet Nam</Text>
            </Flex>
          </Box>
        </HStack>

        {/* Image Grid Section */}
        <Box>
          <Heading
            fontSize="3xl"
            fontFamily={style.fonts.heading}
            py={12}
            textAlign="center"
          >
            Find Talent In Seconds
          </Heading>
        </Box>
        <Flex wrap="wrap" justify="center" align="center" gap={6} px={10}>
          {images.map((src, idx) => {
            let boxSize = "300px"; // Default size for all images
            if (idx === Math.floor(images.length / 2)) {
              boxSize = "400px"; // Center image
            } else if (idx === 0 || idx === images.length - 1) {
              boxSize = "200px"; // First and last images
            }
            return (
              <Image
                key={idx}
                src={src}
                alt={`Image ${idx + 1}`}
                boxSize={boxSize}
                borderRadius="md"
                objectFit="cover"
                boxShadow="lg"
              />
            );
          })}
        </Flex>
      </Box>
    </>
  );
}
