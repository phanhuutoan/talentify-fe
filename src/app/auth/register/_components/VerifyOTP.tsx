import { Field } from "@/_components/lib/ui/field";
import { PinInput } from "@/_components/lib/ui/pin-input";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup.object({
  pin: yup
    .array(yup.string().min(1))
    .length(8, { message: "OTP must be 8 digits long" }),
});

type FormValues = yup.InferType<typeof formSchema>;

export const VerifyOTP = () => {
  const { handleSubmit, control, formState } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Center alignItems="center" h="100vh" w="full" bgColor="gray.100">
      <Flex
        bgColor="white"
        boxShadow="md"
        flexDir={"column"}
        p={8}
        borderRadius={8}
        alignItems={"center"}
      >
        <Text textStyle="3xl" mb={6}>
          Verify OTP
        </Text>
        <HStack as="form" onSubmit={onSubmit} gap="0" id="pin-stack">
          <Field
            invalid={!!formState.errors.pin}
            errorText={formState.errors.pin?.message}
          >
            <Controller
              control={control}
              name="pin"
              render={({ field }) => (
                <PinInput
                  count={6}
                  size="2xl"
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                />
              )}
            />
          </Field>
        </HStack>
        <Text color="gray.500" textStyle="md" mt={4}>
          Please enter the OTP Code sent to your email
        </Text>
      </Flex>
    </Center>
  );
};
