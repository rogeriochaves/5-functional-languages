module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "fp",
    "no-implicit-side-effects",
    "no-foreach",
    "custom-rules",
  ],
  "rules": {
    "no-var": "error",
    // "fp/no-let": ["error"],
    "fp/no-this": ["error"],
    // "fp/no-mutation": ["error"],
    // "no-implicit-side-effects/no-implicit-side-effects": ["error"],
    // "fp/no-loops": ["error"],
    // "no-foreach/no-foreach": ["error"],
    // "custom-rules/no-if-without-else": ["error"],
    "fp/no-class": ["error"],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
