"use client";

import system from "@/_theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface ProviderProps extends PropsWithChildren {}

export function Provider(props: ProviderProps) {
  return <ChakraProvider value={system}>{props.children}</ChakraProvider>;
}
