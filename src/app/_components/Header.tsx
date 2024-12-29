import { Box, Flex, Button, Link, Heading } from '@chakra-ui/react'
import { FaUserTie } from 'react-icons/fa'

export default function Header() {
  return (
    <Box as="header" py={4} px={6} bg="white" boxShadow="sm">
      <Flex maxW="container.xl" mx="auto" justifyContent="space-between" alignItems="center">
        <Link href="/" _hover={{ textDecoration: 'none' }}>
          <Flex alignItems="center">
            <Box as={FaUserTie} w={8} h={8} mr={2} color="purple.500" />
            <Heading as="h1" size="lg" color="purple.500">
              Recruiter
            </Heading>
          </Flex>
        </Link>
        <Flex as="nav" display={{ base: 'none', md: 'flex' }} gap={4}>
          <Link href="#features" color="gray.600" _hover={{ color: 'purple.500' }}>Features</Link>
          <Link href="#testimonials" color="gray.600" _hover={{ color: 'purple.500' }}>Success Stories</Link>
          <Link href="#" color="gray.600" _hover={{ color: 'purple.500' }}>For Recruiters</Link>
        </Flex>
        <Flex gap={2}>
          <Button variant="outline">Log in</Button>
          <Button colorScheme="purple">Create Profile</Button>
        </Flex>
      </Flex>
    </Box>
  )
}

