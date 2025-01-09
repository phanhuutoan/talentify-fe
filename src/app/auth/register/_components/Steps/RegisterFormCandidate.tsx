import { InputField } from "@/_components/ui/form/InputField";
import { GoogleButton } from "@/_components/ui/socials/GoogleButton";
import { LinkedinButton } from "@/_components/ui/socials/LinkedinButton";
import { Flex, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import useSWRMutation from "swr/mutation";
import { ISignupPayload } from "@/_models/auth";
import { authService } from "@/_services/auth";
import { ROLE_ID } from "@/_models/enum";
import { getMessageFromError } from "@/_utils";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/_models/common";
import { toaster } from "@/_components/lib/ui/toaster";
import { passwordRequiredRegex, phoneRegExp } from "@/_constants/regex";
import { FormLayout } from "../Layouts/FormLayout";
import { PhoneWithCodeField } from "@/_components/ui/form/ComposedField/PhoneWithCode";

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
});

type RegisterForm = yup.InferType<typeof yupValidationSchema>;

interface Props {
  onBackClick?: () => void;
  onSignupSuccess?: (email: string, password: string) => void;
}

export const RegisterFormCandidate = (props: Props) => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      verifyPassword: "",
      phonePrefix: undefined,
    },
    resolver: yupResolver(yupValidationSchema),
  });
  const { isMutating, trigger: signupTrigger } = useSWRMutation(
    "auth/sign-up",
    (_1, { arg }: { arg: ISignupPayload }) => authService.signup(arg)
  );
  const [signupErr, setSignupErr] = useState<string | null>(null);

  const onSubmit = async (data: RegisterForm) => {
    try {
      await signupTrigger({
        lastName: data.lastName,
        surname: data.firstName,
        phone: `${data.phonePrefix}-${data.phone}`,
        email: data.email,
        password: data.password,
        roleId: ROLE_ID.CANDIDATE,
      });
      toaster.success({
        title: "Signup successfully! navigating...",
      });
      props.onSignupSuccess?.(data.email, data.password);
    } catch (error) {
      window.scrollTo(0, 0);
      setSignupErr(getMessageFromError(error as AxiosError<ApiErrorResponse>));
    }
  };

  const renderSocialMediaRegister = () => {
    return (
      <VStack
        p={12}
        bgColor="gray.200"
        justify="center"
        alignItems="center"
        w="50%"
        h="13rem"
        borderRadius={8}
        alignSelf="center"
        flexDir="column"
        gap={5}
      >
        <GoogleButton>Register with Google</GoogleButton>
        <LinkedinButton>Register with Linkedin</LinkedinButton>
      </VStack>
    );
  };

  return (
    <FormLayout<RegisterForm>
      formName="Job Seeker"
      isMutating={isMutating}
      form={form}
      onSubmit={onSubmit}
      signUpErr={signupErr}
      setSignupErr={setSignupErr}
      onBackClick={props.onBackClick}
    >
      <FormProvider {...form}>
        <Flex
          borderBottom="1px solid"
          borderColor={"gray.400"}
          pb={8}
          id="register-form"
        >
          <VStack w="48%" mr="2rem" gap="1rem">
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
            <PhoneWithCodeField
              phoneFormName="phone"
              codeFormName="phonePrefix"
              label="Phone Number"
            />
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
          {renderSocialMediaRegister()}
        </Flex>
      </FormProvider>
    </FormLayout>
  );
};
