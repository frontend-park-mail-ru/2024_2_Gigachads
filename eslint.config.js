/** @type {import('eslint').Linter.Config} */
module.exports = [
    // Конфигурация ESLint
    {
        languageOptions: {
            globals: {
                browser: true,
                es2021: true,
            },
            parserOptions: {
                ecmaVersion: 12,
                sourceType: 'module',
            },
        },
        ignores: ['docs/'],
        rules: {
            // Правила из eslint:recommended
            'no-console': 'warn', // Предупреждение о использовании console
            'eqeqeq': 'error', // Использование строгого равенства
            'no-unused-vars': 'warn', // Предупреждение о неиспользуемых переменных
            'quotes': ['error', 'single'], // Использование одинарных кавычек
            'semi': ['error', 'always'], // Обязательное использование точки с запятой
            'curly': 'error', // Обязательное использование фигурных скобок
            // 'no-undef': 'error', // Ошибка при использовании не определенных переменных
            'no-multiple-empty-lines': ['error', { max: 1 }], // Максимум одна пустая строка
            'indent': ['error', 4], // Отступ в 4 пробела
            'prefer-const': 'error', // Предпочтение const для неизменяемых переменных
        },
    },
];