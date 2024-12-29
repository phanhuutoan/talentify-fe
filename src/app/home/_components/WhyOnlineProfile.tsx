"use client";

import { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Icon,
  For,
} from "@chakra-ui/react";
import { FaUserCircle, FaSync, FaSearch } from "react-icons/fa";

const reasons = [
  {
    title: "Stand Out to Recruiters",
    description:
      "A well-maintained  ine profile increases your visibility to potential employers.",
    icon: FaUserCircle,
  },
  {
    title: "Keep Your Information Current",
    description:
      "Regularly updating your profile ensures recruiters see your latest skills and experiences.",
    icon: FaSync,
  },
  {
    title: "Improve Discoverability",
    description:
      "Optimized profiles appear more frequently in recruiter searches, increasing your chances of being found.",
    icon: FaSearch,
  },
];

export default function WhyOnlineProfile() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Box as="section" py={20} bg="gray.50" ref={sectionRef}>
      <Container maxW="container.xl">
        <Heading
          as="h2"
          size="xl"
          textAlign="center"
          mb={12}
          className="animate-on-scroll"
        >
          Why You Need a Great Online Profile
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} padding={8}>
          <For each={reasons} fallback={<div>Loading...</div>}>
            {(reason, index) => (
              <VStack
                key={index}
                align="start"
                p={6}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                className="animate-on-scroll"
              >
                <Icon boxSize={10} color="purple.500" mb={2}>
                  <reason.icon />
                </Icon>
                <Heading as="h3" size="md" mb={2}>
                  {reason.title}
                </Heading>
                <Text>{reason.description}</Text>
              </VStack>
            )}
          </For>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
