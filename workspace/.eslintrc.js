module.exports = {
  "root": true,
  "ignorePatterns": [
    "**/*.js"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "tsconfigRootDir": __dirname,
    "createDefaultProgram": true
  },
  "overrides": [
    {
      "files": [
        "**/*.ts"
      ],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended"
      ],
      "plugins": [
        "unused-imports",
        "prettier"
      ],
      "rules": {
        "unused-imports/no-unused-imports": "error"
      }
    },
    {
      "files": [
        "*.html"
      ],
      "extends": [
        "plugin:@angular-eslint/template/recommended"
      ],
      "rules": {
        "@angular-eslint/template/eqeqeq": "off"
      }
    }
  ]
}
