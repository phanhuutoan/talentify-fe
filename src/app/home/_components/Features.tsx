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
} from "@chakra-ui/react";
import { FaUserPlus, FaBriefcase, FaChartBar } from "react-icons/fa";

const features = [
  {
    title: "Easy Profile Creation",
    description:
      "Build a comprehensive professional profile in minutes with our intuitive tools.",
    icon: FaUserPlus,
  },
  {
    title: "Skill Highlighting",
    description:
      "Showcase your unique skills and experiences to stand out to potential employers.",
    icon: FaBriefcase,
  },
  {
    title: "Profile Analytics",
    description:
      "Get insights into who's viewing your profile and how to improve your visibility.",
    icon: FaChartBar,
  },
];

export default function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);

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

    const elements =
      featuresRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Box as="section" id="features" py={20} bg="white" ref={featuresRef}>
      <Container maxW="container.xl">
        <Heading
          as="h2"
          size="xl"
          textAlign="center"
          mb={12}
          className="animate-on-scroll"
        >
          Our Features
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} padding="md">
          {features.map((feature, index) => (
            <VStack
              key={index}
              align="start"
              p={6}
              bg="gray.50"
              borderRadius="md"
              boxShadow="md"
              className="animate-on-scroll"
              padding={8}
            >
              <Icon w={10} h={10} color="purple.500" mb={2}>
                <feature.icon />
              </Icon>
              <Heading as="h3" size="md" mb={2}>
                {feature.title}
              </Heading>
              <Text>{feature.description}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
