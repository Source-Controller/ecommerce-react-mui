module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "react-app",
    "react-app/jest",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-console": "warn",
    "prefer-const": "error",
    quotes: ["error", "double"],
    "jsx-quotes": ["error", "prefer-double"],
    semi: ["warn", "always"],
  },
  ignorePatterns: [".eslintrc.js"],
};
