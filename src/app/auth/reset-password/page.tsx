"use client";
import { Alert } from "@/_components/lib/ui/alert";
import { Button } from "@/_components/lib/ui/button";
import { toaster } from "@/_components/lib/ui/toaster";
import { InputField } from "@/_components/ui/form/InputField";
import { RESETTING_EMAIL } from "@/_constants/keys";
import { passwordRequiredRegex } from "@/_constants/regex";
import { LogoIcon } from "@/_images/svgs/Logo";
import { ApiErrorResponse } from "@/_models/common";
import { authService, ResetPayload } from "@/_services/auth";
import { Suspense } from "react";
import {
  getMessageFromError,
  getStorageData,
  removeStorageData,
} from "@/_utils";
import { Box, Center, Icon, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import * as yup from "yup";
import { FallBackLoading } from "@/_components/ui/Fallback";
import { useGetEmailParams } from "@/_hooks/useGetEmailParams";

const schema = yup.object().shape({
  code: yup.string().required(),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      passwordRequiredRegex,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    ),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Verified password is required."),
});

type FormValues = yup.InferType<typeof schema>;

/** We have to do this because of this error: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */
const ResetPasswordForm = () => {
  const queryParams = useSearchParams();
  const queryEmail = useGetEmailParams();
  const code = queryParams.get("code") || "";
  const { isMutating, trigger } = useSWRMutation(
    "auth/forgot-password",
    (_1, { arg }: { arg: ResetPayload }) => authService.resetPassword(arg),
  );

  const email = useMemo(() => {
    const storageEmail = getStorageData(RESETTING_EMAIL) as string;

    return queryEmail || storageEmail || "";
  }, [queryEmail]);

  const form = useForm<FormValues>({
    defaultValues: {
      password: "",
      verifyPassword: "",
      code,
    },
    resolver: yupResolver(schema),
  });
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      if (!email) {
        toaster.error({
          title: "Email not found!",
          description: "Please try again! Start from forgot password!",
        });
        return router.push("/auth/forgot-password");
      }
      await trigger({ code: data.code, email, password: data.password });
      toaster.success({
        title: "Password reset successfully!",
        description: "Please login with your new password!",
      });
      router.push("/auth/login");
      removeStorageData(RESETTING_EMAIL);
    } catch (error) {
      setErrorMsg(getMessageFromError(error as AxiosError<ApiErrorResponse>));
    }
  };
  return (
    <Box minH="100vh" w="100vw" bgColor="gray.200" py="2rem">
      <Center cursor="pointer" justifyItems="center" flexDir="column" h="100%">
        <Icon w="15rem" h="4rem" fill="brand.100" mb="2rem">
          <LogoIcon />
        </Icon>
        <FormProvider {...form}>
          <Box
            p="2rem 2rem"
            bgColor="white"
            borderRadius="2xl"
            boxShadow="lg"
            as="form"
            w={{ base: "100%", md: "25rem" }}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Text textStyle="2xl" mb="1.2rem">
              Reset password
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
              name="code"
              label="OTP"
              fieldStyles={{ mb: 4 }}
              inputStyles={{ readOnly: !!code }}
            />
            <InputField
              isShowPasswordStrength
              type="password"
              name="password"
              label="New password"
            />
            <InputField
              type="password"
              name="verifyPassword"
              label="Verify new password"
              fieldStyles={{ mt: "1rem" }}
            />
            <Button
              type="submit"
              colorPalette="brand"
              w="100%"
              mt="2rem"
              loading={isMutating}
            >
              Reset password!
            </Button>
          </Box>
        </FormProvider>
      </Center>
    </Box>
  );
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<FallBackLoading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
