import { CloseButton } from "@/_components/lib/ui/close-button";
import { Center, Text } from "@chakra-ui/react";

const Page = () => {
  return (
    <Center mt={20}>
      <Text textStyle="xl" fontWeight={500}>
        Super title from chakraUI
      </Text>
      <CloseButton />
    </Center>
  );
};

export default Page;
