// eslint.config.mjs
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// load plugin normally via require so we get the object (flat API expects plugin objects)
const tsPlugin = require("@typescript-eslint/eslint-plugin");

export default [
  // global ignores
  {
    ignores: ["dist/**", "coverage/**", "node_modules/**", ".github/**"]
  },

  // Apply to .ts and .tsx files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: new URL(".", import.meta.url).pathname,
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      // require return types on functions
      "@typescript-eslint/explicit-function-return-type": "error",

      // typedef-style strictness (you can tune)
      "@typescript-eslint/typedef": [
        "error",
        {
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: false,
          memberVariableDeclaration: true,
          variableDeclarationIgnoreFunction: true
        }
      ],

      // unused variables (allow underscore-prefixed)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],

      // relax these if you need require() temporarily
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off"
    }
  },

  // Optionally, apply some JS rules to .js files
  {
    files: ["**/*.js"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules: {
      // example: allow console in Node dev
      "no-console": "off"
    }
  }
];
