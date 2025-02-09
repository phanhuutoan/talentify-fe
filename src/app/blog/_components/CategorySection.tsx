"use client";
import { Button } from "@/_components/lib/ui/button";
import { Get100LatestPosts } from "@/_services/graphql/gql-doc/posts";
import { GetPosts } from "@/_services/graphql/models/Posts";
import { blogLinkBuilder } from "@/_utils";
import { useQuery } from "@apollo/client";
import { Flex, GridItem, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";

export const CategorySection = () => {
  const listButtons = ["All", "Skills Station", "Career Compass", "Trending"];
  const { data, loading } = useQuery<{ allPost: GetPosts }>(Get100LatestPosts);
  const [currentCategory, setCurrentCategory] = useState("All");
  const postByCategory =
    data?.allPost.filter((post) =>
      currentCategory === "All"
        ? post
        : post.categories.some((cate) => cate.name === currentCategory),
    ) || [];

  const renderSkeleton = () => {
    return [...Array(6)].map((_, index) => (
      <GridItem key={index}>
        <Skeleton h="14rem" borderRadius="4xl" />
      </GridItem>
    ));
  };
  const isActiveCategory = (cate: string) => cate === currentCategory;
  return (
    <>
      <Flex mt="3rem" mb="2rem" gap={4}>
        {listButtons.map((cate, index) => (
          <Button
            variant="outline"
            borderColor={isActiveCategory(cate) ? "brand.100" : "gray.800"}
            color={isActiveCategory(cate) ? "brand.100" : "gray.800"}
            colorPalette="gray"
            key={index}
            onClick={() => setCurrentCategory(cate)}
          >
            {cate}
          </Button>
        ))}
      </Flex>
      {
        <SimpleGrid columns={{ lg: 3, xl: 4 }} gap={6}>
          {loading
            ? renderSkeleton()
            : postByCategory.map((post, index) => (
                <GridItem key={index}>
                  <Link href={blogLinkBuilder(post._id, post.slug.current)}>
                    <Flex
                      bgImage={`url(${post.mainImage.asset.url})`}
                      h="14rem"
                      bgSize="cover"
                      borderRadius="4xl"
                      transition="transform .5s"
                      _hover={{
                        transform: "scale(1.05)",
                      }}
                      boxShadow="md"
                    />
                    <Text textStyle="md" mt={3} mb={2} fontWeight={600}>
                      {post.title}
                    </Text>
                    {/* November 12, 2024 */}
                    <Text textStyle="sm">
                      {format(post._createdAt!, "LLLL dd, yyyy")}
                    </Text>
                  </Link>
                </GridItem>
              ))}
        </SimpleGrid>
      }
    </>
  );
};
