'use client'

import { useEffect, useRef } from 'react'
import { Box, Container, Heading, SimpleGrid, Text, VStack, HStack, Avatar} from '@chakra-ui/react'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    company: "Tech Solutions Inc.",
    content: "Thanks to Recruiter, I was able to showcase my skills effectively and land my dream job!",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Michael Chen",
    role: "HR Manager",
    company: "Global Innovations",
    content: "As a recruiter, I've found exceptional candidates through Recruiter's platform. It's a game-changer for talent acquisition.",
    avatar: "/placeholder.svg?height=40&width=40"
  }
]

export default function Testimonials() {
  const testimonialsRef = useRef<HTMLDivElement>(null)

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

    const elements = testimonialsRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <Box as="section" id="testimonials" py={20} bg="gray.50" ref={testimonialsRef}>
      <Container maxW="container.xl">
        <Heading 
          as="h2" 
          size="xl" 
          textAlign="center" 
          mb={12}
          className="animate-on-scroll"
        >
          Success Stories
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} padding={8}>
          {testimonials.map((testimonial, index) => (
            <VStack 
              key={index} 
              align="start" 
              p={6} 
              bg="white" 
              borderRadius="md" 
              boxShadow="md"
              className="animate-on-scroll"
            >
              <HStack padding={4} mb={4}>
                <Avatar src={testimonial.avatar} name={testimonial.name} />
                <Box>
                  <Heading as="h3" size="md">
                    {testimonial.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    {testimonial.role}, {testimonial.company}
                  </Text>
                </Box>
              </HStack>
              <Text>"{testimonial.content}"</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

