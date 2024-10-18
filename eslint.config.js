/** @type {import('eslint').Linter.Config} */
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:node/r ecommended',
        'airbnb-base', // или 'standard'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'no-unused-vars': 'warn', // Предупреждение о неиспользуемых переменных
        'quotes': ['error', 'single'], // Использование одинарных кавычек
        'semi': ['error', 'always'], // Обязательное использование точки с запятой
    },
};