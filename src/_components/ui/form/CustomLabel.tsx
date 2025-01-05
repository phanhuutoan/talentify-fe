import { Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  isRequired?: boolean;
}

export const CustomLabel = (props: Props) => {
  return (
    <Text as="label" fontSize="sm">
      {props.children}{" "}
      {props.isRequired && (
        <Text as="span" color="red.500" fontSize="xs">
          *
        </Text>
      )}
    </Text>
  );
};
