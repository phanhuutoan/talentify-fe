"use client";
import { Alert } from "@/_components/lib/ui/alert";
import { Button } from "@/_components/lib/ui/button";
import { toaster } from "@/_components/lib/ui/toaster";
import { FallBack } from "@/_components/ui/Fallback";
import { InputField } from "@/_components/ui/form/InputField";
import { RESETTING_EMAIL } from "@/_constants/keys";
import { useGetEmailParams } from "@/_hooks/useGetEmailParams";
import { LogoIcon } from "@/_images/svgs/Logo";
import { ApiErrorResponse } from "@/_models/common";
import { authService } from "@/_services/auth";
import { getMessageFromError, setStorageData } from "@/_utils";
import { Box, Center, Icon, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

type FormValues = yup.InferType<typeof schema>;

const ForgotPassword = () => {
  const emailQuery = useGetEmailParams();
  const form = useForm({
    defaultValues: {
      email: emailQuery || "",
    },
    resolver: yupResolver(schema),
  });
  const { isMutating, trigger } = useSWRMutation(
    "auth/forgot-password",
    (_1, { arg }: { arg: { email: string } }) =>
      authService.forgotPassword(arg.email),
  );
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      await trigger(data);
      setStorageData(RESETTING_EMAIL, data.email);
      toaster.success({
        title: "Reset password email sent!",
        description: "Please check your email to reset your password!",
      });
      router.push("/auth/reset-password?email=" + data.email);
    } catch (error) {
      setErrorMsg(getMessageFromError(error as AxiosError<ApiErrorResponse>));
    }
  };
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Box h="100vh" w="100vw" bgColor="gray.200">
      <Center cursor="pointer" justifyItems="center" flexDir="column" h="100%">
        <Icon w="15rem" h="4rem" fill="brand.100" mb="2rem">
          <LogoIcon />
        </Icon>
        <FormProvider {...form}>
          <Box
            p="3rem 2rem"
            bgColor="white"
            borderRadius="xl"
            boxShadow="lg"
            as="form"
            w={{ base: "100%", md: "23rem" }}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Text textStyle="xl" mb="2rem">
              Forgot your password?
            </Text>
            {errorMsg && (
              <Alert
                colorPalette="red"
                title="Errors!"
                mb={4}
                onClose={() => setErrorMsg("")}
              >
                {errorMsg}
              </Alert>
            )}
            <InputField
              name="email"
              label="Your email"
              helperText="We will send an email contains code that help you reset your password!"
            />
            <Button
              type="submit"
              colorPalette="brand"
              w="100%"
              mt="2rem"
              loading={isMutating}
            >
              Send reset password!
            </Button>
          </Box>
        </FormProvider>
      </Center>
    </Box>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<FallBack />}>
      <ForgotPassword />
    </Suspense>
  );
}
