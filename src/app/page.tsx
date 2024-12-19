'use client'

import { Box, Container, Heading, Text, Button, VStack, SimpleGrid, Image } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'

export default function Home() {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack padding={10} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center" marginBottom={50}>
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to Our <strong>Talentify</strong> Platform which allow connect you and Employeers
          </Heading>
          <Text fontSize="xl" mb={6}>
            Discover the power of Online Profile
          </Text>
          <Button colorScheme="red" size="lg" bg='red'>
            Get Fucking Started
          </Button>
        </Box>

        {/* Features Section */}
        <Box>
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            Our Features
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} padding={10}>
            {['Beutify Your Profile', 'Highlight Your Yalent', 'Quickly Connect'].map((feature) => (
              <Box key={feature} p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Heading as="h3" size="lg" mb={2}>
                  {feature}
                </Heading>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* About Section */}
        <Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} padding={10}>
            <Box>
              <Heading as="h2" size="xl" mb={4}>
                About Us
              </Heading>
              <Text fontSize="lg">
                We are a team of passionate developers creating high-performance web applications
                using the latest technologies. Our goal is to deliver exceptional user experiences
                through innovative solutions.
              </Text>
            </Box>
            <Box>
              <Image
                src="https://via.placeholder.com/500x300"
                alt="About Us"
                borderRadius="md"
              />
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  )
}

