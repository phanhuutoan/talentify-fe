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
    <Flex mt={20} justify="space-between">
      <Text textStyle="4xl" fontWeight="600">
        Job Categories
      </Text>
      <Flex w="62%" wrap="wrap" justify="flex-end">
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
              py={6}
              px={6}
              size={"lg"}
            >
              {category}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};
