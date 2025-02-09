"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText } from "@portabletext/react";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Box, Flex, Icon, Image, Link, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { GoLinkExternal } from "react-icons/go";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { useColorModeValue } from "@/_components/lib/ui/color-mode";

interface PortableTextProps {
  blocks: any[];
}

export const SanityRichTextRenderer = (props: PortableTextProps) => {
  // p h6 h5 h4 h3 h2 h1
  const headingRenderer = (
    level: ElementType,
    size: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl",
    children: any,
    value?: any,
  ) => {
    const isBigHeading = ["h1", "h2"].includes(level as string);
    return (
      <Text
        as={level}
        textStyle={size}
        my={isBigHeading ? 10 : 4}
        fontWeight={level !== "h6" ? 600 : 400}
        id={value?._key}
        pl={isBigHeading ? 4 : 0}
        borderLeft={isBigHeading ? "2px solid" : "none"}
        borderColor="brand.100"
      >
        {children}
      </Text>
    );
  };
  const codeTheme = useColorModeValue(atomOneLight, atomOneDark);

  const codeBlockRenderer = (code: string, language: string) => {
    return (
      <Box my={4}>
        {/* @ts-expect-error: It used just fined on admin app and can be build normally */}
        <SyntaxHighlighter
          language={language}
          style={codeTheme}
          customStyle={{
            padding: "1.1rem",
            borderRadius: "1rem",
            fontSize: ".9rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </Box>
    );
  };

  const getULMarkerByLevel = (level: number) => {
    const marks = ["disc", "circle", "square"];
    return marks[Math.min(level - 1, marks.length - 1)];
  };

  const getOLMarkerByLevel = (level: number) => {
    const marks = ["decimal", "lower-latin", "lower-roman"];
    return marks[Math.min(level - 1, marks.length - 1)];
  };

  // Define a custom renderer for links
  const linkRenderer = (value: any, children: any) => {
    const target = (value?.href || "").startsWith("http")
      ? "_blank"
      : undefined;
    return (
      <Box cursor="pointer" display="inline-block" h={7}>
        <Flex align="flex-start">
          <Link
            color="brand.100"
            textDecor="underline"
            href={value?.href}
            target={target}
            rel={target === "_blank" ? "noindex nofollow" : ""}
            borderBottom="none"
          >
            {children}
          </Link>
          <Icon fill="brand.100" ml={1} boxSize="3">
            <GoLinkExternal />
          </Icon>
        </Flex>
      </Box>
    );
  };

  const codeRenderer = (children: any) => {
    return (
      <Text
        as="code"
        bg={{ _dark: "gray.800", _light: "gray.100" }}
        color={{ _dark: "red.400", _light: "red.500" }}
        p={1}
        px={2}
        borderRadius="sm"
        fontSize="sm"
      >
        {children}
      </Text>
    );
  };

  const blockquoteRenderer = (children: any) => {
    return (
      <Text
        as="blockquote"
        borderLeft="4px solid"
        borderColor="gray.300"
        pl={4}
        textStyle="lg"
        fontStyle="italic"
        ml={4}
      >
        {children}
      </Text>
    );
  };

  const imageRenderer = (value: any, isInline: boolean) => {
    const { width, height } = getImageDimensions(value);
    return (
      <Image
        src={urlBuilder({
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
          dataset: "production",
        })
          .image(value)
          .width(isInline ? 100 : 800)
          .fit("max")
          .auto("format")
          .url()}
        alt="blog image"
        loading="lazy"
        display={isInline ? "inline-block" : "block"}
        aspectRatio={width / height}
        borderRadius="2xl"
        maxH="30rem"
        objectFit="cover"
        shadow="xl"
        my={4}
      />
    );
  };

  // Define the custom components
  const components = {
    types: {
      code: ({ value }: any) => {
        return codeBlockRenderer(value.code, value.language);
      },
      image: ({ value }: any) => imageRenderer(value, false),
    },
    block: {
      h1: ({ children, value }: any) =>
        headingRenderer("h1", "5xl", children, value),
      h2: ({ children, value }: any) =>
        headingRenderer("h2", "4xl", children, value),
      h3: ({ children, value }: any) =>
        headingRenderer("h3", "3xl", children, value),
      h4: ({ children, value }: any) =>
        headingRenderer("h4", "2xl", children, value),
      h5: ({ children, value }: any) =>
        headingRenderer("h5", "xl", children, value),
      h6: ({ children, value }: any) =>
        headingRenderer("h6", "lg", children, value),
      normal: ({ children }: any) => headingRenderer("h6", "md", children),
      blockquote: ({ children }: any) => blockquoteRenderer(children),
    },

    marks: {
      link: ({ value, children }: any) => linkRenderer(value, children),
      code: ({ children }: any) => codeRenderer(children),
      em: ({ children }: any) => (
        <Text as="em" fontStyle="italic">
          {children}
        </Text>
      ),
      strong: ({ children }: any) => (
        <Text as="strong" fontWeight={600}>
          {children}
        </Text>
      ),
    },

    list: {
      bullet: ({ children, value }: any) => (
        <Box
          as="ul"
          listStyleType={getULMarkerByLevel(value.level || 1)}
          listStylePos="inside"
          ml={6}
          mt={1}
        >
          {children}
        </Box>
      ),
      number: ({ children, value }: any) => {
        return (
          <Box
            as="ol"
            listStyleType={getOLMarkerByLevel(value.level || 1)}
            listStylePos="inside"
            ml={6}
            mt={1}
          >
            {children}
          </Box>
        );
      },
    },
  };
  return (
    <Box id="sanity-rich-text-renderer">
      <PortableText value={props.blocks} components={components} />
    </Box>
  );
};
