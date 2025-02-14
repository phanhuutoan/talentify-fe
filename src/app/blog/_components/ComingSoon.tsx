import { Box, Container, Flex, Text } from "@chakra-ui/react";
import LearningBoy from "@/_images/png/learning-boy.png";
import StartLogoOutline from "@/_images/png/Star.png";
import Tag from "@/_images/png/Tagbig.png";
import { Button } from "@/_components/lib/ui/button";
import Image from "next/image";

interface Props {
  title: string;
  subTitle: string;
  bgColor: string;
  tagTitle: string;
  tagScale: number;
}

export const ComingSoon = ({
  title,
  subTitle,
  bgColor,
  tagTitle,
  tagScale,
}: Props) => {
  return (
    <Container maxW="full">
      <Flex
        h="85vh"
        bgColor={bgColor}
        mt=".5rem"
        p="2rem"
        borderRadius="4xl"
        gap={12}
        align="center"
        pos="relative"
      >
        <Box>
          <Text textStyle="5xl" color="white" mb={4}>
            {title}
          </Text>
          <Text color="white">{subTitle}</Text>
          <Button
            mt="2rem"
            variant="outline"
            colorPalette="white"
            _hover={{ bg: "transparent" }}
            px="2rem"
            py="2.4rem"
          >
            <Image
              src={StartLogoOutline}
              alt="Start Logo"
              height={35}
              width={35}
            />
            <Text textStyle="3xl" color="white" ml={2}>
              Coming Soon!
            </Text>
          </Button>
        </Box>
        <Box>
          <Image
            src={LearningBoy}
            alt="Learning boys"
            height={900}
            width={900}
          />
        </Box>
        <Box pos="absolute" top="0" left="0">
          <Image
            src={Tag}
            alt="Tag"
            height={300}
            width={300}
            style={{ transform: `scaleX(${tagScale})`, transformOrigin: "0 0" }}
          />
          <Text
            textStyle="5xl"
            color="gray.700"
            mt={4}
            pos="absolute"
            top="-1rem"
            left="2.5rem"
            fontFamily="heading"
          >
            {tagTitle}
          </Text>
        </Box>
      </Flex>
    </Container>
  );
};
