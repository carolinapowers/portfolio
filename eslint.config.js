import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig, // This must be last to override ESLint formatting rules
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React Performance Rules
      'react/jsx-no-bind': [
        'warn',
        {
          allowArrowFunctions: false,
          allowFunctions: false,
          allowBind: false,
          ignoreDOMComponents: true,
        },
      ],
      'react/jsx-props-no-spreading': [
        'warn',
        {
          html: 'enforce',
          custom: 'enforce',
          explicitSpread: 'enforce',
        },
      ],
      'react/no-array-index-key': 'error',
      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
        },
      ],
      'react/no-unstable-nested-components': [
        'error',
        {
          allowAsProps: false,
        },
      ],
      'react/jsx-no-constructed-context-values': 'error',
      
      // React Hooks Rules (already from react-hooks plugin but reinforcing)
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      
      // TypeScript Rules for Better Performance Patterns
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Custom syntax restrictions for performance
      'no-restricted-syntax': [
        'warn',
        {
          selector:
            'JSXAttribute[name.name!="className"][name.name!="style"][value.type="JSXExpressionContainer"] > ObjectExpression',
          message:
            'Avoid inline object literals in JSX props. Consider hoisting the object outside the component or using useMemo for stable references.',
        },
        {
          selector:
            'JSXAttribute[name.name!="className"][value.type="JSXExpressionContainer"] > ArrayExpression',
          message:
            'Avoid inline arrays in JSX props. Consider hoisting the array outside the component or using useMemo for stable references.',
        },
        {
          selector:
            'JSXAttribute[name.name!="className"][value.type="JSXExpressionContainer"] > ArrowFunctionExpression',
          message:
            'Avoid inline arrow functions in JSX props. Consider using useCallback for stable function references.',
        },
      ],
    },
  },
])
