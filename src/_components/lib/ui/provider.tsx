"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface ProviderProps extends PropsWithChildren {

}

export function Provider(props: ProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>{props.children}</ChakraProvider>
  );
}
