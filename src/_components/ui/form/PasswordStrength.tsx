import { VStack, Text, Box, Flex, Icon, For } from "@chakra-ui/react";
import { GiCheckMark } from "react-icons/gi";

interface Props {
  value: string;
}

export const PasswordStrength = ({ value }: Props) => {
  const requirements = [
    {
      key: "lowercase",
      regex: /[a-z]/,
      text: "At least one lowercase letter",
    },
    {
      key: "uppercase",
      regex: /[A-Z]/,
      text: "At least one uppercase letter",
    },
    {
      key: "number",
      regex: /[0-9]/,
      text: "At least one number",
    },
    {
      key: "special",
      regex: /[^a-zA-Z0-9]/,
      text: "At least one special character",
    },
    {
      key: "length",
      regex: /.{8,}/,
      text: "At least 8 characters",
    },
  ];

  return (
    <Box>
      <Text color="gray.400" textStyle="sm">
        Password requirements
      </Text>
      <VStack alignItems={"flex-start"} mt={2}>
        <For each={requirements}>
          {({ key, regex, text }) => (
            <Flex alignItems="center" key={key}>
              <Icon
                fill={regex.test(value) ? "green.500" : "gray.200"}
                boxSize={3}
              >
                <GiCheckMark />
              </Icon>
              <Text textStyle="sm" color="gray.400" ml={2}>
                {text}
              </Text>
            </Flex>
          )}
        </For>
      </VStack>
    </Box>
  );
};
