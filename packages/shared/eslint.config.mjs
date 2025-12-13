import tseslint from "typescript-eslint";
import json from "@eslint/json";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";

const config = defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  // lint JSON files
  {
    files: ["**/*.json"],
    ignores: ["package-lock.json"],
    plugins: { json },
    language: "json/json",
    extends: [json.configs.recommended],
  },

  // lint JSONC files
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: [json.configs.recommended],
  },

  // lint JSON5 files
  {
    files: ["**/*.json5"],
    plugins: { json },
    language: "json/json5",
    extends: [json.configs.recommended],
  },
  eslintConfigPrettier,
);

export default config;