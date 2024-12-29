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
            value: "{colors.gray.100}",
          },
          200: {
            value: "{colors.gray.200}",
          },
          300: {
            value: "{colors.gray.300}",
          },
          400: {
            value: "{colors.gray.400}",
          },
          500: {
            value: "{colors.gray.500}",
          },
          600: {
            value: "{colors.gray.600}",
          },
          700: {
            value: "{colors.gray.700}",
          },
          800: {
            value: "{colors.gray.800}",
          },
          900: {
            value: "{colors.gray.900}",
          },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.900}" },
          contrast: { value: "{colors.brand.100}" },
          muted: { value: "{colors.brand.400}" },
          focusRing: { value: "{colors.brand.900}" },
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
  },
  cssVarsPrefix: "tlf", // Talentify prefix
});

const config = mergeConfigs(defaultConfig, customConfig);
const system = createSystem(config);
export default system;
