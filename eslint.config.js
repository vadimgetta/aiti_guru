import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
			eslintConfigPrettier
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			import: importPlugin
		},
		rules: {
			"semi": ["error", "always", { omitLastInOneLineBlock: false }],
			// "indent": ["error", "tab", { SwitchCase: 1 }],
			"comma-dangle": ["error", "never"],
			"quotes": ["error", "double", { allowTemplateLiterals: true }],
			"react/prop-types": "off",

			// TypeScript ESLint
			"@typescript-eslint/no-unused-vars": ["warn"],
			"@typescript-eslint/no-empty-object-type": "off",

			// Стиль кода
			"no-console": ["warn", { allow: ["error"] }],
			"space-before-blocks": ["error", "always"],
			// "comma-spacing": ["error", { before: false, after: true }],
			"arrow-spacing": ["error", { before: true, after: true }],
			"object-curly-spacing": ["error", "always"],
			"key-spacing": ["error", { beforeColon: false, afterColon: true }],
			"no-trailing-spaces": ["error"],
			"eol-last": ["error", "always"],
			"keyword-spacing": ["error", { before: true, after: true }],
			"prefer-const": ["error"],
			"curly": ["error", "all"],
			"eqeqeq": ["error", "always"],
			"no-multi-spaces": ["error"],

			// Импорты
			"import/order": [
				"error",
				{
					"groups": [
						"builtin",
						"external",
						"internal",
						"parent",
						"sibling",
						"index"
					],
					"pathGroups": [
						{
							pattern: "@/**",
							group: "internal",
							position: "after"
						}
					],
					"pathGroupsExcludedImportTypes": ["builtin"],
					"newlines-between": "always",
					"alphabetize": {
						order: "asc",
						caseInsensitive: true
					}
				}
			]
		}
	},
	{
		files: ["src/**/*.{ts,tsx,js,jsx}"],
		rules: {
			"import/no-default-export": "error"
		}
	},

	{
		settings: {
			"import/resolver": {
				node: {
					extensions: [".js", ".jsx", ".ts", ".tsx"]
				},
				alias: {
					map: [["@", "./src"]],
					extensions: [".js", ".jsx", ".ts", ".tsx"]
				}
			}
		}
	}
]);
