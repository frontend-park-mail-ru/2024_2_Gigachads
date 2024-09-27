/** @type {import('eslint').Linter.Config} */
const config = {
    languageOptions: {
        globals: {
            window: 'readonly',
            document: 'readonly',
        },
        parserOptions: {
            ecmaVersion: 12,
            sourceType: 'module',
        },
    },
    rules: {
        'no-unused-vars': 'off'
    },
};

module.exports = config;