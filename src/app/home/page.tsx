"use client"

import Header from './_components/Header'
import Hero from './_components/Hero'
import WhyOnlineProfile from './_components/WhyOnlineProfile'
import Features from './_components/Features'
import Footer from './_components/Footer'
import { Box } from '@chakra-ui/react'

export default function HomePage() {
  return (
    <>
        <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <Box as="main" flex="1">
        <Hero />
        <WhyOnlineProfile />
        <Features />
       </Box>
      <Footer />
    </Box>
    </>

  )
}

