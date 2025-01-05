import { Field, FieldProps } from "@/_components/lib/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/_components/lib/ui/select";
import { createListCollection } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormErrorMessage } from "./_formErrMessage";

interface SimpleSelectProps {
  variant?: "subtle" | "outline";
  size?: "sm" | "md" | "lg" | "xs";
  listItems: { label: string; value: string }[];
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  onBlur: () => void;
  placeholder?: string;
  label?: ReactNode;
  invalid?: boolean;
}

export const SimpleSelect = (props: SimpleSelectProps) => {
  const {
    variant,
    size,
    listItems,
    name,
    value,
    onBlur,
    onChange,
    placeholder,
    label,
    invalid,
  } = props;
  const collections = createListCollection({
    items: listItems,
  });

  return (
    <SelectRoot
      key={size}
      size={size}
      collection={collections}
      variant={variant}
      name={name}
      value={value}
      onValueChange={({ value }) => onChange(value)}
      onInteractOutside={() => onBlur()}
      invalid={invalid}
    >
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectTrigger>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {collections.items.map((col) => (
          <SelectItem item={col} key={col.value}>
            {col.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

interface SimpleSelectFieldProps
  extends Omit<SimpleSelectProps, "value" | "onChange" | "onBlur"> {
  labelBuilder?: () => ReactNode;
  isRequired?: boolean;
  helperText?: string;
  fieldStyles?: FieldProps;
}

export const SimpleSelectField = (props: SimpleSelectFieldProps) => {
  const { control, formState } = useFormContext();
  const { name } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Field
            {...props.fieldStyles}
            invalid={!!formState.errors[name]}
            errorText={
              <FormErrorMessage errors={formState.errors} name={name} />
            }
          >
            <SimpleSelect
              {...props}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              onBlur={field.onBlur}
            />
          </Field>
        </>
      )}
    />
  );
};
