import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  variants: {
    visual: {
      outline: {
        bg: "blue",
        borderWidth: "thick",
      },
    },
  },
  defaultVariants: {
    // visual: "outline",
  },
});
