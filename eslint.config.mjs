import {dirname} from "path";
import {fileURLToPath} from "url";

import {FlatCompat} from "@eslint/eslintrc";
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    js.configs.recommended,
    ...compat.extends(
        "next/core-web-vitals",
        "next/typescript",
    ),
    {
        ignores: [".next"],
    },
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            reactPlugin,
            testingLibraryPlugin,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
        },
    },
];

export default eslintConfig;
