"use client";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import HeroBg from "@/_images/hero-bg.png";
import { Button } from "@/_components/lib/ui/button";
import { useState } from "react";
import { useConfirmDialog } from "@/_hooks/useConfirmDialog";
import useSWRMutation from "swr/mutation";
import { landingService } from "@/_services/landing";
import { emailRegex } from "@/_constants/regex";
import { toaster } from "@/_components/lib/ui/toaster";

export const Subscription = () => {
  const [value, setValue] = useState("");
  const { isMutating, trigger: subscriberTrigger } = useSWRMutation(
    "landing/subscribe",
    (_1, { arg }: { arg: string }) => landingService.sendSubscriberEmail(arg),
  );

  const subscribe = async () => {
    try {
      if (!value) {
        throw new Error("Email is required");
      }
      if (emailRegex.test(value) === false) {
        throw new Error("Invalid email address");
      }

      await subscriberTrigger(value);
      onOpen();
    } catch (error) {
      console.error(error);
      toaster.error({
        title: "Error",
        description: (error as Error).message,
      });
    }
  };
  const { onClose, onOpen, Dialog } = useConfirmDialog({
    isOpen: false,
    title: <Text textStyle="2xl">Thank you for subscribing us!</Text>,
    body: (
      <Text textStyle="lg">
        We will keep you updated with the latest news and updates.
      </Text>
    ),
    onOk: () => {
      onClose();
      setValue("");
    },
    dialogProps: {
      colorPalette: "brand",
      py: 4,
    },
  });
  return (
    <Box
      bgImage={`url(${HeroBg.src})`}
      bgSize="cover"
      bgPos="center"
      p={{ base: 10, md: 15, lg: 20 }}
      pb={{ base: 20, md: 22, lg: 36 }}
      borderRadius="2rem"
      mb="3rem"
    >
      <Text
        fontFamily="heading"
        textStyle={{ base: "3xl", md: "4xl" }}
        mb={8}
        fontWeight={600}
      >
        Be the first one to know!
      </Text>
      <Text mb={8} w="full">
        Subscribe with your email to get early access and exclusive updates.{" "}
        <br />
        Stay ahead of the curve and be a part of the action before anyone else!
      </Text>
      <Flex gap={6} align="center" w={{ base: "100%", md: "80%", lg: "65%" }}>
        <Input
          size={{ base: "md", md: "lg", lg: "xl" }}
          placeholder="Your email here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          borderRadius="10rem"
          bgColor="white"
          colorPalette="brand"
          _placeholder={{ color: "brand.200" }}
        />
        <Button
          colorPalette="gray"
          textTransform="uppercase"
          onClick={subscribe}
          loading={isMutating}
        >
          Subscribe now
        </Button>
      </Flex>
      {Dialog}
    </Box>
  );
};
