import { Box, Container, SimpleGrid, Stack, Text, Link, Heading } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box as="footer" bg="gray.800" color="white" py={12}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 4 }} padding={8}>
          <Stack padding={6}>
            <Box>
              <Heading as="h3" size="lg" mb={2}>
                Recruiter
              </Heading>
              <Text fontSize="sm" color="gray.400">
                Connecting talent with opportunities.
              </Text>
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <Heading as="h4" size="md" mb={2}>
              For Job Seekers
            </Heading>
            <Link href={'#'} color="gray.400" _hover={{ color: 'white' }}>Create Profile</Link>
            <Link href={'#'} color="gray.400" _hover={{ color: 'white' }}>Search Jobs</Link>
            <Link href={'#'} color="gray.400" _hover={{ color: 'white' }}>Career Resources</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Heading as="h4" size="md" mb={2}>
              For Recruiters
            </Heading>
            <Link href={'#'} color="gray.400" _hover={{ color: 'white' }}>Post a Job</Link>
            <Link href={'#'} color="gray.400" _hover={{ color: 'white' }}>Search Candidates</Link>
            <Link href={'#'} color="gray.400" _hover={{ color: 'white' }}>Recruiting Solutions</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Heading as="h4" size="md" mb={2}>
              Connect
            </Heading>
            <Link href={'#'} color="gray.400" _hover={{ color: 'white' }}>Twitter</Link>
            <Link href={'#'} color="gray.400" _hover={{ color: 'white' }}>LinkedIn</Link>
            <Link href={'#'} color="gray.400" _hover={{ color: 'white' }}>Facebook</Link>
          </Stack>
        </SimpleGrid>
        <Box borderTopWidth={1} borderStyle={'solid'} borderColor={'gray.700'} pt={8} mt={8} textAlign={'center'}>
          <Text fontSize={'sm'} color={'gray.400'}>
            © 2023 Recruiter. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}

