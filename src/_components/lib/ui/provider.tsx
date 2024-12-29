"use client";

import system from "@/_theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";


export function Provider(props: PropsWithChildren) {
  return <ChakraProvider value={system}>{props.children}</ChakraProvider>;
}
