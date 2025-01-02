import {
  createSystem,
  defineConfig,
  defaultConfig,
  mergeConfigs,
} from "@chakra-ui/react";
import { buttonRecipe } from "./recipes/_button";
import { inputRecipe } from "./recipes/_input";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          100: {
            value: "#FF5722",
          },
          200: {
            value: "#FF5722",
          },
          300: {
            value: "#F56B13",
          },
          400: {
            value: "#F6872B",
          },
        },
        dark: {
          900: { value: "#303841" },
        },
        gray: {
          200: { value: "#F1F5F9" },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.100}" },
          contrast: { value: "{colors.gray.100}" },
          fg: { value: "{colors.brand.100}" },
          muted: { value: "{colors.brand.200}" },
          focusRing: { value: "{colors.brand.400}" },
          subtle: { value: "{colors.orange.100}" },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
    },
  },
  globalCss: {
    a: {
      "&:hover": {
        borderBottom: "1px solid #333",
      },
    },
    body: {
      "& *": {
        color: "gray.900",
      },
    },
  },
  cssVarsPrefix: "tlf", // Talentify prefix
});

const config = mergeConfigs(defaultConfig, customConfig);
const system = createSystem(config);
export default system;
