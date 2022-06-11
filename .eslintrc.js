module.exports = {
  env: {
    commonjs: true,
    node: true,
    mocha: true
  },
  plugins: ['mocha', 'prettier'],
  extends: ['airbnb-base', 'prettier'],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'linebreak-style': 'off',
    'func-names': ['error', 'never'],
    'no-console': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-shadow': ['error', { allow: ['err', 'error'] }],
    'no-underscore-dangle': 'off',
    'comma-dangle': 'off',
    'camelcase': 'off',
    'no-tabs': 'off',
    'prefer-destructuring': ['error', { object: false, array: false }]
  }
};
