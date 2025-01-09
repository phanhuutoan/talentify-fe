import { Box, HStack } from "@chakra-ui/react";
import { CustomLabel } from "../CustomLabel";
import { InputField } from "../InputField";
import { SimpleSelectField } from "../SimpleSelect";
import { phonePrefix } from "@/_static-data/phone-prefix";

interface PhoneWithCodeFieldProps {
  codeFormName: string;
  phoneFormName: string;
  label: string;
}

/**
 * Only can be used inside react form hook
 */
export const PhoneWithCodeField = ({
  codeFormName,
  phoneFormName,
  label,
}: PhoneWithCodeFieldProps) => {
  const allPhonePrefixed = phonePrefix
    .sort((item1, item2) => item1.country.localeCompare(item2.country))
    .map((item) => ({
      label: `${item.country} (${item.prefix})`,
      value: item.value,
    }));

  return (
    <Box alignSelf="flex-start" w="full">
      <CustomLabel isRequired>{label}</CustomLabel>
      <HStack justify="flex-start" mt={1} align="flex-start">
        <SimpleSelectField
          name={codeFormName}
          listItems={allPhonePrefixed}
          fieldStyles={{ w: "17rem" }}
          placeholder="Select code"
        />
        <InputField
          placeholder="0231232321"
          isRequired
          name={phoneFormName}
          fieldStyles={{ w: "full" }}
        />
      </HStack>
    </Box>
  );
};
