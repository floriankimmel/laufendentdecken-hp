import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**', '.cache/**', 'src/generated/**']
  },
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];
