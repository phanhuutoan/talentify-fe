import { Box } from "@chakra-ui/react";
import { BlogHeader } from "./_components/BlogHeader";
import { Footer } from "@/_components/ui/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talentify Blog, Latest article and news",
  description:
    "Talentiy blog, where we share our knowledge and experience in the variant industries",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BlogHeader />
      <Box as="main" minH="65vh" pt={2} pb={12}>
        {children}
      </Box>
      <Footer />
    </>
  );
}
