import Header from './components/Header'
import Hero from './components/Hero'
import WhyOnlineProfile from './components/WhyOnlineProfile'
import Features from './components/Features'
import Footer from './components/Footer'
import { Box } from '@chakra-ui/react'

export default function HomePage() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <Box as="main" flex="1">
        <Hero />
        <WhyOnlineProfile />
        <Features />
\      </Box>
      <Footer />ss
    </Box>
  )
}

