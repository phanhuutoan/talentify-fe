import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/_components/lib/ui/progress-circle";
import { Center, Text } from "@chakra-ui/react";

export const FallBack = () => {
  return (
    <Center h="100vh" w="100vw" flexDir="column" gap={6} bgColor={"gray.200"}>
      <ProgressCircleRoot value={null} colorPalette={"orange"} size="xl">
        <ProgressCircleRing cap="round" />
      </ProgressCircleRoot>
      <Text>Loading</Text>
    </Center>
  );
};
