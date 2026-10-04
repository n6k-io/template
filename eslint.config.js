import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import unicorn from "eslint-plugin-unicorn";
import * as mdx from "eslint-plugin-mdx";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  // n6k.gen.ts is generated; build/ and deps are not ours to lint. shadcn
  // vendors src/components/ui/** and src/lib/utils.ts — `shadcn add` overwrites
  // them, so linting them is noise we can't fix.
  {
    ignores: [
      "build/",
      "node_modules/",
      ".venv/",
      "src/**/n6k.gen.ts",
      "src/components/ui/**",
      "src/lib/utils.ts",
    ],
  },

  // TypeScript / TSX
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      unicorn.configs.recommended,
    ],
    languageOptions: {
      globals: { ...globals.browser },
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // `props` (React) and `env` are conventional here — allow them while
      // keeping unicorn's abbreviation checks on for everything else.
      "unicorn/name-replacements": [
        "error",
        { replacements: { props: false, env: false } },
      ],
      // n6k page directories are snake_case: the folder name is both the route
      // slug and a Python package (`src/app/what_if/data.py`), and hyphens are
      // illegal in Python module names. Allow snake_case alongside the kebab-case
      // we use for component files.
      "unicorn/filename-case": [
        "error",
        { cases: { kebabCase: true, snakeCase: true } },
      ],
    },
  },

  // MDX prose + JS/TS fenced code blocks inside it
  {
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({ lintCodeBlocks: true }),
  },
  {
    ...mdx.flatCodeBlocks,
    rules: {
      ...mdx.flatCodeBlocks.rules,
    },
  },

  // Keep formatting decisions with prettier — must be last.
  prettier,
);
