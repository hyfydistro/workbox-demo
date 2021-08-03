module.exports = {
  env: {
    browser: true,
    es2021 : true,
    node   : true,
  },
  extends: [
    "airbnb-base",
  ],
  parser       : "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType : "module",
  },
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    // # Prettier
    "prettier/prettier": 0,

    "@typescript-eslint/no-use-before-define": ["error"],
    // ! If occur:
    // ! Error sample: ‘Enum’ is already declared in the upper scope
    // "no-shadow": "off",
    // "@typescript-eslint/no-shadow": ["error"],

    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    // "import/extensions": [
    //     "error",
    //     "ignorePackages",
    //     {
    //         "ts": "never",
    //         "tsx": "never"
    //     }
    // ],
    "import/extensions"   : "off", // ! Use with JSX file type and Webpack

    // ! Experimental
    // "max-len": ["warn", { "code": 80 }],
    "max-len": 0,

    "import/no-extraneous-dependencies": 0, // ! temp w/ TypeScript file "globalTypes.ts"
    "comma-dangle"                     : 0,
    quotes                             : ["warn", "double", { allowTemplateLiterals: true }],
    "semi-spacing"                     : ["warn", { before: false, after: true }],
    semi                               : ["warn", "always"],
    "no-unused-vars"                   : "warn",
    "func-names"                       : "off",
    "no-console"                       : "off",
    "object-shorthand"                 : "off",
    "class-methods-usethis:"           : "off",
    indent                             : [
      "error",
      2,
      {
        MemberExpression      : 1,
        VariableDeclarator    : "first",
        ArrayExpression       : "first",
        ObjectExpression      : "first",
        ImportDeclaration     : "first",
        flatTernaryExpressions: true,
        ignoreComments        : true
      }
    ],
    "quote-props"          : ["warn", "as-needed"],
    "prefer-arrow-callback": [
      "error",
      {
        allowNamedFunctions: true
      }
    ],
    "function-paren-newline": ["warn", "multiline"],
    "no-underscore-dangle"  : "off",
    eqeqeq                  : "off",
    "class-methods-use-this": "off",
    "no-useless-escape"     : "off",
    "prefer-destructuring"  : "off",
    "array-element-newline" : [
      "error",
      {
        ArrayExpression: "consistent"
      }
    ],
    "space-in-parens"     : ["warn", "never"], // e.g. func( param, param ) {...}
    "object-curly-spacing": ["warn", "always"],
    "key-spacing"         : [
      2,
      {
        singleLine: {
          beforeColon: false,
          afterColon : true
        },
        multiLine: {
          beforeColon: false,
          afterColon : true,
          align      : "colon"
        }
      }
    ],

    // ! experimental
    "space-unary-ops": {"words": true, "nonwords": false},
    "space-infix-ops": ["error", { "int32Hint": true }]
  },
  ignorePatterns: [
    "prettier.config.js",
    "babel.config.js",
    "postcss.config.js",
    "jest.config.*.js",
    "jest.setup.*.js",
    "node-modules",
    "dist",
    "*.config.js",
    "tests"
  ]
};
