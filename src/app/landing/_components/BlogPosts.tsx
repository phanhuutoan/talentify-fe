import {
  Box,
  Container,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import Link from "next/link";

export const BlogPosts = () => {
  const dummyDataArticles = [
    {
      title: "Exploring the Wonders of the Amazon Rainforest",
      description:
        "A detailed look at the biodiversity, challenges, and conservation efforts in the Amazon rainforest.",
      createdAt: "2025-01-13T10:15:00.000Z",
      author: {
        name: "Jane Doe",
      },
      category: "Environment",
      image:
        "https://imageupscaler.com/wp-content/uploads/2024/07/deblured-cutty-fox.jpg",
    },
    {
      title: "The Rise of Electric Vehicles in 2025",
      description:
        "An overview of the growing adoption of electric vehicles and the challenges facing the auto industry.",
      createdAt: "2025-01-12T08:45:00.000Z",
      author: {
        name: "John Smith",
      },
      category: "Technology",
      image:
        "https://www.unite.ai/wp-content/uploads/2023/12/601b1bfb-b5f9-4a7d-9a5d-a04616685e42.jpg",
    },
    {
      title: "10 Easy Recipes for Busy Moms",
      description:
        "Quick and healthy meal ideas to simplify dinner time for busy families.",
      createdAt: "2025-01-11T18:30:00.000Z",
      author: {
        name: "Minh Tong",
      },
      category: "Lifestyle",
      image:
        "https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg",
    },
  ];
  return (
    <Flex py="4rem" bgColor="gray.200" my="5rem">
      <Container maxW="7xl">
        <Box mb="4rem">
          <Text textStyle="4xl" fontFamily="heading" fontWeight={600}>
            Check our articles
          </Text>
          <Text color="gray.700" mt="1rem">
            Discover insights, stories, and tips across a variety of topics.
          </Text>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: 10, md: 6, lg: 20 }}
        >
          {dummyDataArticles.map((article, index) => (
            <GridItem key={index}>
              <Link href="/blog/[slug]" as={`/blog/${article.title}`}>
                <Box
                  pos="relative"
                  cursor="pointer"
                  transition="all .3s"
                  _hover={{
                    transform: "translateY(-10px)",
                    boxShadow: "md",
                  }}
                >
                  <Box
                    overflow="hidden"
                    _after={{
                      content: '""',
                      pos: "absolute",
                      top: 0,
                      left: 0,
                      w: "100%",
                      h: "46%",
                      bg: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,.3) 30%, rgba(0,0,0,0) 50%)",
                      zIndex: 0,
                    }}
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      height="13rem"
                      objectFit="cover"
                      w="full"
                      borderTopRadius={8}
                    />
                    <Text
                      pos="absolute"
                      fontFamily="heading"
                      bottom="56%"
                      right={2}
                      color="white"
                      zIndex={25}
                      textStyle="lg"
                      borderRight="2px solid"
                      borderBottom="1px solid"
                      px=".5rem"
                      py={1}
                      borderColor="gray.300"
                    >
                      {article.author.name}
                    </Text>
                  </Box>
                  <Box
                    p={{ base: 2, md: 6, lg: 8 }}
                    bgColor="white"
                    h="15rem"
                    borderBottomRadius={8}
                  >
                    <Text
                      textStyle={{ md: "md", lg: "xl" }}
                      fontWeight={600}
                      color="brand.300"
                    >
                      {article.title}
                    </Text>
                    <Text mt={2} color="gray.600">
                      {article.description}
                    </Text>
                    <Text
                      textStyle="sm"
                      textAlign="left"
                      mt="4"
                      color="gray.500"
                    >
                      {format(article.createdAt, "dd/MM/yyyy")}{" "}
                    </Text>
                  </Box>
                  <Box
                    pos="absolute"
                    p="2"
                    pr={5}
                    bgColor="brand.100"
                    color="white"
                    top={-2}
                    left={-2}
                    boxShadow="md"
                    clipPath="polygon(0 0, 100% 0, 86% 100%, 0 100%)"
                    fontWeight={600}
                  >
                    {article.category}
                  </Box>
                </Box>
              </Link>
            </GridItem>
          ))}
        </SimpleGrid>
      </Container>
    </Flex>
  );
};
