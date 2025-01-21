import { Box, Container } from "@chakra-ui/react";
import { BlogHeader } from "./_components/BlogHeader";
import { Footer } from "@/_components/ui/Footer";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BlogHeader />
      <Container maxW="full">
        <Box as="main" minH="65vh">
          {children}
        </Box>
        <Footer />
      </Container>
    </>
  );
}
