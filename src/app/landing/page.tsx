import { Container, Separator } from "@chakra-ui/react";
import { NavBar } from "./_components/NavBar";
import { Hero } from "./_components/Hero";
import { Quality } from "./_components/Quality";
import { JobCategories } from "./_components/JobCategories";
import { PartnerSlider } from "./_components/PartnetSlider";
import { BlogPosts } from "./_components/BlogPosts";
import { Footer } from "./_components/Footer";
import { Subscription } from "./_components/Subscription";

export default function LandingPage() {
  return (
    <>
      <Container maxW="7xl">
        <NavBar />
        <Hero />
        <Quality />
        <JobCategories />
      </Container>
      <Container maxW="full" pb={12}>
        <Separator my={{ base: 10, md: 20 }} />
        <PartnerSlider />
      </Container>
      <BlogPosts />
      <Container maxW="7xl">
        <Subscription />
        <Footer />
      </Container>
    </>
  );
}
