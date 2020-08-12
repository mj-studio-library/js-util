module.exports = {
  root: true,
  extends: '@dooboo/eslint-config',
  rules: {
    'max-len': [
      'error',
      {
        code: 120,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
      },
    ],
    '@typescript-eslint/no-empty-function': 0,
    'no-extra-parens': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-useless-escape': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'no-throw-literal': 0,
    'no-unused-expressions': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
};
