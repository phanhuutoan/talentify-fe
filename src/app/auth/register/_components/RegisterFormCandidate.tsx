import { Checkbox } from "@/_components/lib/ui/checkbox";
import { InputField } from "@/_components/ui/form/InputField";
import { GoogleButton } from "@/_components/ui/socials/GoogleButton";
import { LinkedinButton } from "@/_components/ui/socials/LinkedinButton";
import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import { MdArrowBackIos } from "react-icons/md";
import * as yup from "yup";
import useSWRMutation from "swr/mutation";
import { ISignupPayload } from "@/_models/auth";
import { authService } from "@/_services/auth";
import { ROLE_ID } from "@/_models/enum";
import { getMessageFromError } from "@/_utils";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/_models/common";
import { Alert } from "@/_components/lib/ui/alert";
import { Button } from "@/_components/lib/ui/button";
import { toaster } from "@/_components/lib/ui/toaster";

const yupValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#\^!%*\-_?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Verified password is required."),
});

type RegisterForm = yup.InferType<typeof yupValidationSchema>;

interface Props {
  onBackClick?: () => void;
  onSignupSuccess?: () => void;
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
        phone: data.phone,
        email: data.email,
        password: data.password,
        roleId: ROLE_ID.CANDIDATE,
      });
      toaster.success({
        title: "Signup successfully! navigating...",
      });
      props.onSignupSuccess?.();
    } catch (error) {
      window.scrollTo(0, 0);
      setSignupErr(getMessageFromError(error as AxiosError<ApiErrorResponse>));
    }
  };

  const [enableButton, setEnableButton] = useState(false);

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
    <Flex
      bgColor="gray.200"
      flexDir="column"
      p={8}
      minH="100vh"
      pl="10rem"
      py="4rem"
      color="gray.900"
    >
      <Text as="h1" textStyle="4xl" mb={4} color="brand.100">
        Register as a{" "}
        <Text display="inline-block" bgColor="brand.100" color="white" px={2}>
          Job Seeker
        </Text>
      </Text>
      {/* Form box */}
      <FormProvider {...form}>
        <Flex
          as="form"
          bgColor="white"
          p={8}
          borderRadius={8}
          boxShadow="md"
          w="50rem"
          flexDir="column"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {signupErr && (
            <Alert
              colorPalette="red"
              title="Signup errors!"
              mb={4}
              onClose={() => setSignupErr(null)}
            >
              {signupErr}
            </Alert>
          )}
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
              <InputField
                label="Phone Number"
                placeholder="0231232321"
                isRequired
                name="phone"
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
          <Flex justifyContent="space-between" mt="1rem">
            <Flex>
              <Text textStyle="sm" color="gray.600" mt={4}>
                Already have account?
              </Text>
              <Link href="/auth/login">
                <Text textStyle="sm" color="brand.100" mt={4} ml={1}>
                  Sign-in
                </Text>
              </Link>
            </Flex>
            <Box>
              <Checkbox
                colorPalette="brand"
                display="flex"
                alignItems="flex-start"
                variant="subtle"
                size="sm"
                strokeColor="white"
                onChange={(event) =>
                  setEnableButton((event.target as HTMLInputElement).checked)
                }
              >
                <Text color="gray.700">Accepts terms and conditions</Text>
                <Link href="#">
                  <Text as="span" textStyle="sm" color="gray.400" mt={4}>
                    You agree to our Terms of Service and Privacy Policy.
                  </Text>
                </Link>
              </Checkbox>
            </Box>
          </Flex>
          {/* Button group */}
          <Flex mt={8} justifyContent="flex-end">
            <Button
              variant="outline"
              colorPalette="gray"
              onClick={props.onBackClick}
            >
              <Icon boxSize={4} ml={1} color="brand.100">
                <MdArrowBackIos />
              </Icon>
              Go back
            </Button>
            <Button
              type="submit"
              colorPalette="brand"
              disabled={!enableButton}
              ml={4}
              loading={isMutating}
            >
              Complete register
              <Icon boxSize={4} fill="white" ml={1}>
                <PiArrowBendUpRightBold />
              </Icon>
            </Button>
          </Flex>
        </Flex>
      </FormProvider>
    </Flex>
  );
};
