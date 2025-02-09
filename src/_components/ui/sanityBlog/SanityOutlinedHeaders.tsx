"use client";
import { Flex, Link, Text } from "@chakra-ui/react";
import { useMemo, useState, MouseEvent, useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PortableTextProps {
  blocks: any[];
}

export const SanityOutlinedHeaders = (props: PortableTextProps) => {
  const [headingId, setHeadingId] = useState<string | null>(null);
  const isActive = (id: string) => headingId === id;
  useEffect(() => {
    const headings = props.blocks
      .filter(
        (block) =>
          block._type === "block" &&
          block.style.includes("h") &&
          block.style !== "h6",
      )
      .map((block) => ({
        id: block._key as string,
        offsetTop: document.getElementById(block._key as string)?.offsetTop,
      }));
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      for (let i = 0; i < headings.length; i++) {
        const maxIndex = Math.min(headings.length - 1, i + 1);
        if (
          headings[i].offsetTop! <= scrollPosition &&
          headings[maxIndex].offsetTop! > scrollPosition
        ) {
          setHeadingId(headings[i].id);
        } else if (scrollPosition < headings[0].offsetTop!) {
          setHeadingId(null);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listHeading = useMemo(() => {
    return props.blocks
      .filter(
        (block) =>
          block._type === "block" &&
          block.style.includes("h") &&
          block.style !== "h6",
      )
      .map((block) => {
        const ml = ["h1", "h2"].includes(block.style) ? 0 : 4;
        return {
          text: block.children[0].text as string,
          id: block._key as string,
          level: block.style,
          ml,
        };
      });
  }, [props.blocks]);

  const handleScroll = (e: MouseEvent<HTMLAnchorElement, any>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onOutlineClick = (
    e: MouseEvent<HTMLAnchorElement, any>,
    id: string,
  ) => {
    handleScroll(e, id);
  };
  return (
    <Flex
      p={8}
      flexDir="column"
      borderRadius="md"
      pos="sticky"
      top={2}
      left={2}
      boxShadow="md"
    >
      <Text textStyle="4xl" mb={4} fontWeight={700} color="brand.100">
        Content
      </Text>
      {listHeading.map((heading) => (
        <Link
          href={`#${heading.id}`}
          key={heading.id}
          textDecor="none"
          w="100%"
          onClick={(e) => onOutlineClick(e, heading.id)}
          outline="none"
          borderBottom="none"
          ml={heading.ml}
        >
          <Text
            textStyle={["h1", "h2"].includes(heading.level) ? "lg" : "md"}
            fontWeight={600}
            cursor="pointer"
            color={isActive(heading.id) ? "brand.100" : "inherit"}
            p={1}
            borderRadius="md"
            _hover={{ bgColor: { _light: "gray.200", _dark: "gray.800" } }}
            w="full"
          >
            {heading.text}
          </Text>
        </Link>
      ))}
    </Flex>
  );
};
