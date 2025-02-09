import { InputGroup } from "@/_components/lib/ui/input-group";
import { Tooltip } from "@/_components/lib/ui/tooltip";
import { useSearchPost } from "@/_services/hooks/useSearchPost";
import { blogLinkBuilder } from "@/_utils";
import { Box, Icon, Input, Text, Separator, Skeleton } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

export const SearchBox = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [keywords, setKeywords] = useState<string>("");
  const { searchedPosts, searchPostFn, loading } = useSearchPost();

  useEffect(() => {
    if (keywords.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        searchPostFn(keywords);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords]);

  const renderSearchedPosts = () => {
    if (keywords.length < 3) {
      return (
        <Box p={2} textStyle="sm">
          Please type more than 2 characters to start searching.
        </Box>
      );
    }
    if (loading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <Skeleton mt="2" key={index} h="4rem" borderRadius="md" />
      ));
    }
    if (searchedPosts.length === 0) {
      return <Box p={2}>No results matches.</Box>;
    }
    return searchedPosts.map((post) => (
      <Tooltip
        content={post.title}
        key={post._id}
        openDelay={100}
        showArrow
        positioning={{ placement: "top" }}
      >
        <Link href={blogLinkBuilder(post._id, post.slug.current)}>
          <Box
            key={post._id}
            fontWeight={600}
            _hover={{ bgColor: "gray.100" }}
            p={2}
            borderRadius="md"
            onClick={() => setKeywords("")}
          >
            <Text truncate color="brand.100">
              {post.title}
            </Text>
            <Text fontSize="sm">
              {post.author.name} - #{post.categories[0].name}
            </Text>
          </Box>
        </Link>
      </Tooltip>
    ));
  };
  return (
    <Box pos="relative" height="auto">
      <InputGroup
        ref={ref}
        endElement={
          <Icon boxSize={6} fill={"brand.100"}>
            <CiSearch />
          </Icon>
        }
        w="20rem"
      >
        <Input
          border="2px solid"
          borderColor="brand.100"
          borderRadius="50px"
          placeholder="Search Post, Authors, ..."
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          _focusVisible={{ outlineColor: "brand.200" }}
        />
      </InputGroup>
      {keywords.length >= 1 && (
        <Box
          pos="absolute"
          left={0}
          minH="5rem"
          bg="white"
          borderRadius="2xl"
          mt={2}
          shadow="xl"
          w={ref.current?.clientWidth || "20rem"}
          zIndex={100}
          p={4}
          transformOrigin="bottom"
        >
          <Text fontWeight={600} ml={2} mb={2} textStyle="lg">
            Search result
          </Text>
          <Separator />
          {renderSearchedPosts()}
        </Box>
      )}
    </Box>
  );
};
