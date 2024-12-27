"use client";
import { Button } from "@/_components/lib/ui/button";
import { authService } from "@/_services/auth";
import { Box, Text } from "@chakra-ui/react";

export const MainProfile = () => {
  const onClick = async () => {
    console.log("CLICK");
    await authService.logout();
  };
  return (
    <Box>
      <Text ml={4} textStyle="2xl">
        Profile page
      </Text>
      <Button onClick={onClick}>Logout</Button>
    </Box>
  );
};
