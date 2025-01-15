import { Button } from "@/_components/lib/ui/button";
import { Flex, Text } from "@chakra-ui/react";

export const JobCategories = () => {
  const listCategories = [
    "Most Popular",
    "Science and Technology",
    "Arts and Culture",
    "Industry",
    "Agriculture",
    "Environment and Energy",
    "Legal and Political",
    "Construction",
    "Services",
    "Remote Jobs",
    "Onsite Jobs",
    "Onsite Jobs",
    "Hybrid Jobs",
  ];

  return (
    <Flex
      mt={20}
      justify="space-between"
      flexDir={{ base: "column", lg: "row" }}
    >
      <Text
        textStyle={{ base: "3xl", md: "4xl" }}
        fontWeight="600"
        mb={{ base: 8, lg: 0 }}
      >
        Job Categories
      </Text>
      <Flex
        w={{ base: "100%", md: "65%" }}
        wrap="wrap"
        justify={{ base: "center", lg: "flex-end" }}
        align={{ base: "flex-start", lg: "flex-end" }}
      >
        {listCategories.map((category, index) => {
          return (
            <Button
              variant={index !== 0 ? "outline" : "solid"}
              colorPalette={index !== 0 ? "gray" : "brand"}
              borderColor="gray.800"
              border="2px solid"
              key={index}
              mr={2}
              mb={4}
              py={{ base: undefined, md: 6 }}
              px={{ base: undefined, md: 6 }}
              size={{ base: "sm", md: "md", lg: "lg" }}
            >
              {category}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};
