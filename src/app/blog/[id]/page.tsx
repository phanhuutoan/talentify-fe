import { PostsService } from "@/_services/graphql/query/posts";
import {
  Avatar,
  Container,
  Flex,
  GridItem,
  Icon,
  Separator,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { CategoryButton } from "../_components/CategoryButton";
import Link from "next/link";
import { GoLink } from "react-icons/go";
import { SlSocialFacebook, SlSocialLinkedin } from "react-icons/sl";
import { Button } from "@/_components/lib/ui/button";
import { SanityRichTextRenderer } from "@/_components/ui/sanityBlog/SanityRichTextRenderer";
import { SanityOutlinedHeaders } from "@/_components/ui/sanityBlog/SanityOutlinedHeaders";
import readTime from "reading-time";
import { sanity } from "@/_utils";
import { format } from "date-fns";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const fetchPostById = async (id: string) => {
  const postsService = new PostsService();
  const post = await postsService.getPostById(id);
  return post;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const actualId = id.split(".")[0];
  const postRes = await fetchPostById(actualId);
  const postData = postRes.data.Post;

  return {
    title: `Talentify blog: ${postData.title}`,
    description: postData.shortDescription,
    applicationName: "Talentity",
    keywords: ["talentity", ...postData.slug.current.split("-")],
    openGraph: {
      images: [postData.mainImage.asset.url],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const actualId = id.split(".")[0];
  const postRes = await fetchPostById(actualId);
  const post = postRes.data.Post;

  const backLinks = [
    {
      href: "#",
      icon: GoLink,
      name: "link",
    },
    {
      href: "#",
      icon: SlSocialFacebook,
      name: "fb",
    },
    {
      href: "#",
      icon: SlSocialLinkedin,
      name: "linkedin",
    },
  ];

  return (
    <>
      <Flex
        bgImage={`url(${post.mainImage.asset.url})`}
        w="100%"
        h="calc(100vh - 80px)"
        bgSize="cover"
        alignItems="flex-end"
      >
        <SimpleGrid
          columns={8}
          gap={2}
          w="full"
          alignContent="end"
          p="8"
          pb="16"
          pt={10}
          bg="linear-gradient(0deg, rgb(63, 63, 63), rgba(98, 98, 98, 0));"
        >
          <GridItem colSpan={6} color="white">
            <CategoryButton category={post.categories[0].name} />
            <Text color="inherit" textStyle="7xl" fontFamily="heading" my={4}>
              {post.title}
            </Text>
            <Text color="inherit" textStyle="lg" fontFamily="body" mt={8}>
              {post.shortDescription}
            </Text>
          </GridItem>
          <GridItem colSpan={2} alignItems="flex-end">
            <Flex align="flex-end" justifyContent="flex-end" h="full">
              <Flex gap={6}>
                {backLinks.map((link, index) => (
                  <Link key={index} target="_blank" href={link.href} passHref>
                    <Button
                      boxSize="4rem"
                      variant="outline"
                      bgColor="white"
                      colorPalette="brand"
                    >
                      <Icon boxSize={6} cursor="pointer" fill="brand.100">
                        <link.icon />
                      </Icon>
                    </Button>
                  </Link>
                ))}
              </Flex>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </Flex>
      <Container maxW="7xl" mt={8}>
        <SimpleGrid columns={3} gap={8}>
          <GridItem colSpan={2} p={8} py={10} borderRadius="2xl" shadow="md">
            <Flex justify="space-between" mb={10}>
              <Text textStyle="sm" fontWeight={600}>
                Reading time:{" "}
                {readTime(sanity.blocksToText(post.contentRaw)).text}
              </Text>
              <Text textStyle="sm">
                {format(post._createdAt!, "LLLL dd, yyyy")}
              </Text>
            </Flex>
            <SanityRichTextRenderer blocks={post.contentRaw} />
            <Separator my={6} />
            <Flex align="center" justify="flex-end" mt={8}>
              <Avatar.Root size="2xl">
                <Avatar.Fallback>{post.author.name}</Avatar.Fallback>
                <Avatar.Image src={post.author.avatar.asset.url} />
              </Avatar.Root>
              <Text fontWeight={600} ml={4} textStyle="lg">
                {post.author.name}
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <SanityOutlinedHeaders blocks={post.contentRaw} />
          </GridItem>
        </SimpleGrid>
      </Container>
    </>
  );
}
