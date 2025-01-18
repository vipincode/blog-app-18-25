import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        // Define global variables here
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      ...tsPlugin.configs['recommended'].rules,
      'prettier/prettier': 'error',
      // Add any custom rules here
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^next$',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['.lintstagedrc.js', '*.config.js', '*.config.cjs', '*.config.mjs'],
    languageOptions: {
      globals: {
        // Define Node.js global variables
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  prettierConfig,
];

// import js from '@eslint/js';
// import tsPlugin from '@typescript-eslint/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';
// import prettierPlugin from 'eslint-plugin-prettier';
// import prettierConfig from 'eslint-config-prettier';

// export default [
//   js.configs.recommended,
//   {
//     files: ['**/*.{js,jsx,ts,tsx}'],
//     plugins: {
//       '@typescript-eslint': tsPlugin,
//       prettier: prettierPlugin,
//     },
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//         project: './tsconfig.json',
//       },
//       globals: {
//         // Add Node.js global variables and Node.js scoping
//         console: 'readonly',
//         process: 'readonly',
//         __dirname: 'readonly',
//         __filename: 'readonly',
//         module: 'readonly',
//         require: 'readonly',
//       },
//     },
//     rules: {
//       ...tsPlugin.configs['recommended'].rules,
//       'prettier/prettier': 'error',
//       // Add any custom rules here
//     },
//   },
//   {
//     files: ['*.config.js', '*.config.cjs', '*.config.mjs', 'src/**/*.ts'],
//     languageOptions: {
//       globals: {
//         // Add Node.js global variables and Node.js scoping
//         console: 'readonly',
//         process: 'readonly',
//         __dirname: 'readonly',
//         __filename: 'readonly',
//         module: 'readonly',
//         require: 'readonly',
//       },
//     },
//     env: {
//       node: true,
//     },
//     rules: {
//       'no-undef': 'off',
//     },
//   },
//   {
//     ignores: ['dist/**', 'node_modules/**'],
//   },
//   prettierConfig,
// ];
