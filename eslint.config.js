import js from "@eslint/js"
import github from "eslint-plugin-github"
import jest from "eslint-plugin-jest"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(["coverage/", "dist/", "eslint.config.js"]),
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  github.getFlatConfigs().recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "i18n-text/no-en": "off"
    }
  },
  {
    files: ["__tests__/**/*.ts"],
    extends: [jest.configs["flat/recommended"]]
  }
])
