import { Field as ChakraField, Text } from "@chakra-ui/react";
import * as React from "react";

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
  isRequired?: boolean;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const {
      label,
      children,
      helperText,
      errorText,
      optionalText,
      isRequired,
      ...rest
    } = props;

    return (
      <ChakraField.Root ref={ref} {...rest}>
        {label && (
          <ChakraField.Label>
            {label}
            {isRequired && (
              <Text as="span" color="red.500" textStyle="xs">
                *
              </Text>
            )}
            <ChakraField.RequiredIndicator fallback={optionalText} />
          </ChakraField.Label>
        )}
        {children}
        {helperText && (
          <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
        )}
        {errorText}
      </ChakraField.Root>
    );
  }
);
