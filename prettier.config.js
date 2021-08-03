module.exports = {
  requireConfig: true,
  configPath: ".prettierrc.json",
  trailingComma: "none",
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  endOfLine: "auto",
  proseWrap: "never",
  overrides: [
    {
      files: "*.md",
      options: {
        tabWidth: 4
      }
    },
    {
      files: "*.json",
      options: {
        tabWidth: 4
      }
    }
  ]
};