import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/_components/lib/ui/progress-circle";
import { Center, Text } from "@chakra-ui/react";

interface Props {
  h?: string;
  w?: string;
}

export const FallBackLoading = ({ h = "100vh", w = "100vw" }: Props) => {
  return (
    <Center h={h} w={w} flexDir="column" gap={6} bgColor={"gray.200"}>
      <ProgressCircleRoot value={null} colorPalette={"orange"} size="xl">
        <ProgressCircleRing cap="round" />
      </ProgressCircleRoot>
      <Text>Loading</Text>
    </Center>
  );
};
