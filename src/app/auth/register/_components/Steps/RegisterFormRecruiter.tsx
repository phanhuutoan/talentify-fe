import { passwordRequiredRegex, phoneRegExp } from "@/_constants/regex";
import { FormLayout } from "../Layouts/FormLayout";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { HStack, VStack, Text, Box } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "@/_components/ui/form/InputField";
import { CustomLabel } from "@/_components/ui/form/CustomLabel";
import { SimpleSelectField } from "@/_components/ui/form/SimpleSelect";
import { IndustrySelectionField } from "@/_components/ui/form/ComposedField/IndustrySelection";
import { phonePrefix } from "@/_static-data/phone-prefix";

const yupValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is invalid"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      passwordRequiredRegex,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Verified password is required."),
  phonePrefix: yup.array(yup.string().required()).required("Code is required"),
  company: yup.object().shape({
    name: yup.string().required("Company name is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    address: yup.string().required("Address is required"),
    industry: yup
      .array()
      .of(yup.string())
      .min(1, "At least one industry is required")
      .required("Industry is required"),
  }),
});

type RegisterForm = yup.InferType<typeof yupValidationSchema>;

interface Props {
  onBackClick?: () => void;
  onSignupSuccess?: (email: string, password: string) => void;
}

export const RegisterFormRecruiter = (props: Props) => {
  const form = useForm<RegisterForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      verifyPassword: "",
      phonePrefix: undefined,
      company: {
        name: "",
        country: "",
        city: "",
        address: "",
        industry: [],
      },
    },
    resolver: yupResolver(yupValidationSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    console.log(data);
  };
  const [signupErr, setSignupErr] = useState<string | null>(null);
  const allPhonePrefixed = phonePrefix
    .sort((item1, item2) => item1.country.localeCompare(item2.country))
    .map((item) => ({
      label: `${item.country} (${item.prefix})`,
      value: item.value,
    }));

  return (
    <FormLayout<RegisterForm>
      formName="Employer"
      isMutating={false}
      form={form}
      onSubmit={onSubmit}
      signUpErr={signupErr}
      setSignupErr={setSignupErr}
      onBackClick={props.onBackClick}
      isAn
    >
      <FormProvider {...form}>
        <HStack
          borderBottom="1px solid"
          borderColor={"gray.400"}
          pb={8}
          id="register-form"
          gap={20}
          alignItems="flex-start"
        >
          <VStack w="50%" align="flex-start" gap={4}>
            <Text textStyle="2xl" as="h2" fontWeight={600} mb={6}>
              Account information
            </Text>
            <InputField
              label="First Name"
              placeholder="Nguyen Tran..."
              isRequired
              name="firstName"
            />
            <InputField
              label="Last Name"
              placeholder="Minh Huy..."
              isRequired
              name="lastName"
            />
            <Box alignSelf="flex-start" w="full">
              <CustomLabel isRequired>Phone Number</CustomLabel>
              <HStack justify="flex-start" mt={1} align="flex-start">
                <SimpleSelectField
                  name="phonePrefix"
                  listItems={allPhonePrefixed}
                  fieldStyles={{ w: "17rem" }}
                  placeholder="Select code"
                />
                <InputField
                  placeholder="0231232321"
                  isRequired
                  name="phone"
                  fieldStyles={{ w: "full" }}
                />
              </HStack>
            </Box>
            <InputField
              label="Email"
              placeholder="Example@email.com"
              isRequired
              name="email"
            />
            <InputField
              label="Password"
              placeholder="Example123..."
              isRequired
              name="password"
              type="password"
              isShowPasswordStrength
            />
            <InputField
              label="Verify Password"
              placeholder="Example123..."
              isRequired
              name="verifyPassword"
              type="password"
            />
          </VStack>
          <VStack w="50%" align="flex-start" gap={4}>
            <Text textStyle="2xl" as="h2" fontWeight={600} mb={6}>
              Company information
            </Text>
            <InputField
              label="Company name"
              placeholder="ABC Corporation..."
              isRequired
              name="company.name"
              helperText="Enter your company name based on contract with the government"
            />
            <InputField
              label="Country"
              placeholder="Viet Nam..."
              isRequired
              name="company.country"
            />
            <InputField
              label="City"
              placeholder="Ho Chi Minh"
              isRequired
              name="company.city"
            />
            <InputField
              label="Address"
              placeholder="224 Pham Ngu Lao, Phuong X, Quan Y..."
              isRequired
              name="company.address"
            />
            <IndustrySelectionField formName="company.industry" />
          </VStack>
        </HStack>
      </FormProvider>
    </FormLayout>
  );
};
