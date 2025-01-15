"use client";

// import { Box } from "@chakra-ui/react";
// import Header from "./_components/Header";
// import Hero from "./_components/Hero";
// import WhyOnlineProfile from "./_components/WhyOnlineProfile";
// import Features from "./_components/Features";
// import Footer from "./_components/Footer";
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/landing");
  // return (
  //   <Box minHeight="100vh" display="flex" flexDirection="column">
  //     <Header />
  //     <Box flex="1">
  //       <Hero />
  //       <WhyOnlineProfile />
  //       <Features />
  //     </Box>
  //     <Footer />
  //   </Box>
  // );
}
