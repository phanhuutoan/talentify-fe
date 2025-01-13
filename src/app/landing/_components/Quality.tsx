import { Flex, GridItem, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { LuUserPlus } from "react-icons/lu";
import { IoTrendingUpSharp, IoSearchOutline } from "react-icons/io5";

export const Quality = () => {
  const benefits = [
    {
      title: "Latest Professional Profile",
      desc: "Candidates continuously update their profiles, helping recruiters always find potential talent.",
      icon: LuUserPlus,
    },
    {
      title: "Expand career opportunities",
      desc: "Candidates can expand their career opportunities by taking courses and certifications.",
      icon: IoTrendingUpSharp,
    },
    {
      title: "Proactively seeks talent",
      desc: "The recruiter proactively seeks potential candidates.",
      icon: IoSearchOutline,
    },
  ];
  return (
    <Flex id="quality-section" flexDir="column" align="center" mt="7.5rem">
      <Text textStyle="3xl" mb="3.5rem" fontWeight="600">
        We are building the quality of each candidate
      </Text>
      <SimpleGrid columns={3} gap={{ md: 5, lg: 20 }}>
        {benefits.map((benefit, index) => (
          <GridItem
            key={index}
            colSpan={{ base: 3, md: 1 }}
            mb={{ base: 8, md: 0 }}
          >
            <Flex
              key={index}
              flexDir="column"
              align="flex-start"
              px={8}
              py={12}
              boxShadow="md"
              h="full"
              pos="relative"
              cursor="pointer"
              transition="all 0.5s .3s"
              _after={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                bg: "brand.100",
                h: "100%",
                width: "2%",
                zIndex: -1,
                transition: "transform 0.2s, width 0.3s 0.4s",
                transitionTimingFunction: "cubic-bezier(.17,.15,.09,.99)",
                transform: "scaleY(0)",
              }}
              _hover={{
                _after: {
                  width: "100%",
                  transform: "scaleX(1)",
                },
                transform: "scale(1.1)",
                color: "white",
                "& svg": {
                  transition: "all 0.5s .3s",
                  stroke: "white",
                },
              }}
            >
              <Icon boxSize={14} stroke="brand.100" mb={12}>
                <benefit.icon />
              </Icon>
              <Text textStyle="xl" color="inherit" fontWeight="600" mb={4}>
                {benefit.title}
              </Text>
              <Text textStyle="sm" color="inherit">
                {benefit.desc}
              </Text>
            </Flex>
          </GridItem>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
