module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'plugin:mocha/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    'mocha',
  ],
  rules: {
    'linebreak-style': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'object-shorthand': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prefer-arrow-callback': 'off',
    'func-names': 'off',
  },
};
