import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import typescriptEslint from 'typescript-eslint';
import parserTs from '@typescript-eslint/parser';
import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind';
import eslintPluginTailwind from 'eslint-plugin-tailwindcss';

export default typescriptEslint.config(
    {
        ignores: [
            '*.d.ts',
            '**/coverage',
            '**/dist',
            '**/node_modules',
            '**/public',
        ],
    },
    {
        plugins: {
            '@stylistic/ts': stylisticTs,
        },

        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.recommended,
        ],

        files: ['**/*.ts'],

        languageOptions: {
            ecmaVersion: 'latest',

            sourceType: 'module',

            globals: globals.browser,

            parserOptions: {
                parser: parserTs,
            },
        },

        rules: {
            quotes: ['error', 'single'],

            '@stylistic/ts/indent': ['error', 4],

            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        plugins: {
            '@stylistic/ts': stylisticTs,
            'readable-tailwind': eslintPluginReadableTailwind,
        },

        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.recommended,
            ...eslintPluginVue.configs['flat/recommended'],
            ...eslintPluginTailwind.configs['flat/recommended'],
        ],

        files: ['**/*.{vue,js}'],

        languageOptions: {
            ecmaVersion: 'latest',

            sourceType: 'module',

            globals: globals.browser,

            parserOptions: {
                parser: parserTs,
            },
        },

        rules: {
            // enable all recommended rules to warn
            ...eslintPluginReadableTailwind.configs.warning.rules,
            // enable all recommended rules to error
            ...eslintPluginReadableTailwind.configs.error.rules,

            quotes: ['error', 'single'],

            'quote-props': ['error', 'as-needed'],

            'vue/html-indent': ['error', 4, {
                'baseIndent': 1,
            }],

            'vue/script-indent': ['error', 4, {
                'baseIndent': 1,
                'switchCase': 1,
            }],

            // Disable @typescript-eslint/indent inside Vue files to avoid conflicts
            '@stylistic/ts/indent': 'off',

            'readable-tailwind/multiline': ['error', {
                printWidth: 160,
            }],

            'readable-tailwind/sort-classes': ['error', {
                order: 'improved',
            }],

            'tailwindcss/no-custom-classname': 'warn',
            'tailwindcss/classnames-order': 'off',

            '@typescript-eslint/no-explicit-any': 'off',

            // // Relax line length limit.
            // 'max-len': ['error', 160],

            // '@typescript-eslint/indent': ['error', 4],

            // 'import/no-extraneous-dependencies': 0,
        },
    },
);
