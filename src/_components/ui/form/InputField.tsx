import { Input, InputProps, Text } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { BaseFieldProps } from "./_types";
import { Field, FieldProps } from "@/_components/lib/ui/field";
import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";
import { PasswordStrength } from "./PasswordStrength";

interface InputFieldProps extends BaseFieldProps {
  inputStyles?: InputProps;
  fieldStyles?: FieldProps;
  labelBuilder?: () => ReactNode;
  isRequired?: boolean;
  helperText?: string;
  isShowPasswordStrength?: boolean;
}

export const InputField = (props: InputFieldProps) => {
  const {
    name,
    placeholder,
    type,
    label,
    inputStyles = {},
    labelBuilder,
    isRequired,
    helperText,
    fieldStyles = {},
    isShowPasswordStrength,
  } = props;

  const { control, formState } = useFormContext();
  const labelComponent = labelBuilder ? labelBuilder() : label;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Field
            {...field}
            {...fieldStyles}
            label={labelComponent}
            invalid={!!formState.errors[name]}
            isRequired={isRequired}
            helperText={helperText}
            errorText={
              <ErrorMessage
                errors={formState.errors}
                name={name}
                render={({ message }) => (
                  <Text color="red.500" textStyle="sm" fontWeight={500}>
                    {message}
                  </Text>
                )}
              />
            }
          >
            <Input
              name={name}
              onChange={(e) => field.onChange(e.target.value)}
              type={type}
              placeholder={placeholder}
              colorPalette={"brand"}
              _placeholder={{ color: "gray.400" }}
              {...inputStyles}
            />
            {isShowPasswordStrength && <PasswordStrength value={field.value} />}
          </Field>
        </>
      )}
    />
  );
};
