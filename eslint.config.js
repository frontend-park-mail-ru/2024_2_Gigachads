import { defineConfig } from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default defineConfig({
    languageOptions: {
        parser: typescriptParser,
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
    },
    plugins: {
        '@typescript-eslint': typescriptPlugin,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
    ],
    ignores: ['docs/'],
    rules: {
        'no-console': 'warn',
        'eqeqeq': 'error',
        'no-unused-vars': 'warn',
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'curly': 'error',
        'no-multiple-empty-lines': ['error', { max: 1 }],
        'indent': ['error', 4],
        'prefer-const': 'error',
    },
});