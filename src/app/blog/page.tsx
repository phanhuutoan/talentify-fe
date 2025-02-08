import { PostsService } from "@/_services/graphql/query/posts";
import { Flex, GridItem, Icon, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { CategoryButton } from "./_components/CategoryButton";
import { BsArrowRight } from "react-icons/bs";
import { LatestPosts } from "./_components/LatestPost";
import { blogLinkBuilder } from "@/_utils";
import { CategorySection } from "./_components/CategorySection";

const fetchBlog = async () => {
  const postsService = new PostsService();
  const posts = await postsService.getLatestPost();
  return posts;
};

const Page = async () => {
  const posts = await fetchBlog();
  const randomPost = Math.floor(Math.random() * 5);
  const firstPost = posts.data.allPost[randomPost];

  return (
    <>
      <Flex
        bgImage={`url(${firstPost.mainImage.asset.url})`}
        w="100%"
        h="80vh"
        bgSize="cover"
        borderRadius="4xl"
        alignItems="flex-end"
      >
        <SimpleGrid
          columns={8}
          gap={2}
          w="full"
          alignContent="end"
          p="6"
          pt={10}
          borderBottomRadius="4xl"
          bg="linear-gradient(0deg, rgb(63, 63, 63), rgba(185, 185, 185, 0));"
        >
          <GridItem colSpan={6} color="white">
            <CategoryButton category={firstPost.categories[0].name} />
            <Text color="inherit" textStyle="6xl" fontFamily="heading" my={4}>
              {firstPost.title}
            </Text>
            <Text color="inherit" textStyle="lg" fontFamily="body" mt={8}>
              {firstPost.shortDescription}
            </Text>
          </GridItem>
          <GridItem colSpan={2} alignItems="flex-end">
            <Flex align="flex-end" justifyContent="flex-end" h="full">
              <Link
                href={blogLinkBuilder(firstPost._id, firstPost.slug.current)}
                target="_blank"
                style={{ borderBottom: "none" }}
              >
                <Icon
                  boxSize="8rem"
                  fill="white"
                  transition="transform .5s"
                  cursor="pointer"
                  _hover={{ transform: "translateX(1rem)" }}
                >
                  <BsArrowRight />
                </Icon>
              </Link>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </Flex>
      <LatestPosts allPost={posts.data.allPost} isLoading={posts.loading} />
      <CategorySection />
    </>
  );
};

export default Page;
