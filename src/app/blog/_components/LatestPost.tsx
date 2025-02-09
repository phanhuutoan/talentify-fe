"use client";
import { FallBackLoading } from "@/_components/ui/Fallback";
import { GetPosts, Post } from "@/_services/graphql/models/Posts";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import "react-multi-carousel/lib/styles.css";
import tagPng from "@/_images/png/Tag.png";
import { blogLinkBuilder } from "@/_utils";

interface Props {
  allPost: GetPosts;
  isLoading: boolean;
}

export const LatestPosts = ({ allPost, isLoading = true }: Props) => {
  const renderNewsCard = (p: Post, index: number) => {
    return (
      <Link
        href={blogLinkBuilder(p._id, p.slug.current)}
        key={index}
        style={{ borderBottom: "none" }}
      >
        <Flex
          color="white"
          key={index}
          bgImage={`url(${p.mainImage.asset.url})`}
          bgSize="cover"
          borderRadius="4xl"
          w="28rem"
          h="18rem"
          align="flex-end"
          pos="relative"
          transition="all 0.3s"
          _hover={{ transform: "translateY(-10px)" }}
        >
          <Box
            p={4}
            color="white"
            bg="linear-gradient(0deg, rgb(63, 63, 63), rgba(60, 60, 60, 0.8), rgba(185, 185, 185, .0));"
            borderRadius="4xl"
          >
            <Text color="inherit" textStyle="xl" fontFamily="heading" mb={4}>
              {p.title}
            </Text>
            <Text color="inherit" textStyle="sm">
              {p.shortDescription}
            </Text>
          </Box>
          <Box pos="absolute" top={0} left={0}>
            <Image src={tagPng.src} alt="tag" w="13rem" />
            <Text textStyle="md" pos="absolute" top="9px" left="16px">
              # {p.categories[0].name}
            </Text>
          </Box>
        </Flex>
      </Link>
    );
  };

  return (
    <Box mt={20}>
      <Text
        textStyle="5xl"
        fontFamily="heading"
        fontWeight={600}
        mb={8}
        color="gray.700"
      >
        Latest posts
      </Text>

      {!isLoading ? (
        <Flex overflowX="auto" py={4}>
          <Flex gap={12}>
            {allPost.map((p, index) => renderNewsCard(p, index))}
          </Flex>
        </Flex>
      ) : (
        <FallBackLoading />
      )}
    </Box>
  );
};
