import { Button } from "@/_components/lib/ui/button";
import { Field } from "@/_components/lib/ui/field";
import { PinInput } from "@/_components/lib/ui/pin-input";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/_components/lib/ui/progress-circle";
import { toaster } from "@/_components/lib/ui/toaster";
import { ApiErrorResponse } from "@/_models/common";
import { authService } from "@/_services/auth";
import { getMessageFromError } from "@/_utils";
import { Center, Flex, HStack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import * as yup from "yup";

const formSchema = yup.object({
  pin: yup
    .array(yup.string().min(1))
    .length(6, { message: "OTP must be 8 digits long" })
    .required(),
});

type FormValues = yup.InferType<typeof formSchema>;
interface Props {
  email: string | null;
  onSuccess: () => void;
}

const COOLDOWN = 120;
export const VerifyOTP = (props: Props) => {
  const { handleSubmit, control, formState, setError } = useForm<FormValues>({
    defaultValues: {
      pin: ["", "", "", "", "", ""],
    },
    resolver: yupResolver(formSchema),
  });
  const { isMutating: isVerifying, trigger: verifyTrigger } = useSWRMutation(
    "auth/verify",
    (_1, { arg }: { arg: { email: string; opt: string } }) =>
      authService.verifyOTP(arg.email, arg.opt)
  );

  const { isMutating: isResending, trigger: resendTrigger } = useSWRMutation(
    "auth/resend-code",
    (_1, { arg }: { arg: string }) => authService.resendOTP(arg)
  );
  const resendOTP = async () => {
    try {
      await resendTrigger(props.email!);
      toaster.success({
        title: "OTP Code sent successfully to your email!",
      });
      setSeconds(COOLDOWN);
    } catch (error) {
      console.log("Error Resend OTP", error);
      toaster.error({
        title: "Failed to resend OTP Code!",
        description: getMessageFromError(error as AxiosError<ApiErrorResponse>),
      });
    }
  };

  const [seconds, setSeconds] = useState(COOLDOWN);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await verifyTrigger({ email: props.email!, opt: data.pin.join("") });
      props.onSuccess();
      toaster.success({
        title: "OTP Verified Successfully, navigate to the next step!",
      });
    } catch (error) {
      setError("pin", {
        message:
          "Invalid OTP, please recheck the code sent to your email and try again!",
        type: "validate",
      });
      console.log("Error OTP", error);
    }
  });

  const pin = useWatch({ control, name: "pin" });
  useEffect(() => {
    if (pin.join("").length === 6) {
      onSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);
  return (
    <Center alignItems="center" h="100vh" w="full" bgColor="gray.100">
      <Flex
        bgColor="white"
        boxShadow="md"
        flexDir={"column"}
        p={8}
        borderRadius={8}
        alignItems={"center"}
        w="40rem"
      >
        <Text textStyle="3xl" mb={6} fontWeight={500}>
          Verify OTP
        </Text>
        <HStack as="form" onSubmit={onSubmit} gap="0" id="pin-stack">
          <Field
            invalid={!!formState.errors.pin}
            alignItems="center"
            errorText={
              <Text mt={4} color="red.500">
                {formState.errors.pin?.message}
              </Text>
            }
          >
            <Controller
              control={control}
              name="pin"
              render={({ field }) => (
                <PinInput
                  count={6}
                  size="2xl"
                  value={field.value as string[]}
                  onValueChange={(e) => field.onChange(e.value)}
                />
              )}
            />
          </Field>
        </HStack>
        <Flex alignItems="center" flexDir="column">
          {isVerifying && (
            <Flex alignItems="center" mt="4">
              <ProgressCircleRoot
                value={null}
                size="sm"
                colorPalette={"orange"}
                mr="4"
              >
                <ProgressCircleRing cap="round" />
              </ProgressCircleRoot>
              <Text color="gray.500" textStyle="lg" fontWeight={500}>
                Verifying...
              </Text>
            </Flex>
          )}{" "}
          {!isVerifying && !formState.errors.pin && (
            <Text color="gray.500" textStyle="lg" fontWeight={500}>
              Please enter the OTP Code sent to your email
            </Text>
          )}
          <Flex mt={2} align="center">
            {seconds <= 0 ? (
              <Button
                size="md"
                variant="ghost"
                py={4}
                onClick={resendOTP}
                loading={isResending}
              >
                Resend OTP
              </Button>
            ) : (
              <Text color="gray.400">Resend OTP code after {seconds}s...</Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
};
