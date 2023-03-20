module.exports = {
  root: false,
  env: {
    node: true,
  },
  ecmaFeatures: {
    modules: true,
    spread: true,
    restParams: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
    allowImportExportEverywhere: true,
  },
  // Other configs...
  globals: {
    $: true,
    jQuery: true,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    camelcase: "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-var-requires": 0,
    "prettier/prettier": 0,
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-this-alias": "off",
    "vue/no-v-for-template-key-on-child": "off",
  },
};
