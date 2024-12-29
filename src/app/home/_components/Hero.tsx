'use client'

import { Box, Container, Heading, Text, Button } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <Box 
      as="section" 
      py={20} 
      bgGradient="linear(to-r, purple.500, pink.500)" 
      color="white"
      ref={heroRef}
    >
      <Container maxW="container.xl" textAlign="center">
        <Heading 
          as="h2" 
          size="3xl" 
          mb={6} 
          className="animate-on-scroll"
        >
          Build Your Professional Profile
        </Heading>
        <Text 
          fontSize="xl" 
          mb={8} 
          maxW="2xl" 
          mx="auto"
          className="animate-on-scroll"
        >
          Create a standout online presence that gets you noticed by top recruiters and employers.
        </Text>
        <Button 
          size="lg" 
          bg="white" 
          color="purple.500" 
          _hover={{ bg: 'gray.100' }}
          className="animate-on-scroll"
        >
          Create Your Profile
        </Button>
      </Container>
    </Box>
  )
}

