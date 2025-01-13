import { defineSlotRecipe } from "@chakra-ui/react";

export const dialogRecipe = defineSlotRecipe({
  slots: ["content"],
  variants: {
    size: {
      "2xl": {
        content: {
          maxW: "6xl",
        },
      },
    },
  },
});
