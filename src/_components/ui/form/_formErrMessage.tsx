import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues } from "react-hook-form";
import { Text } from "@chakra-ui/react";

interface Props {
  errors: FieldErrors<FieldValues>;
  name: string;
}
export const FormErrorMessage = (props: Props) => {
  return (
    <ErrorMessage
      errors={props.errors}
      name={props.name}
      render={({ message }) => (
        <Text color="red.500" textStyle="sm" fontWeight={500}>
          {message}
        </Text>
      )}
    />
  );
};
