import path from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	base: "/aiti_guru/",
	plugins: [
		react(),
		svgr({
			include: "**/*.svg?react"
		})
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	},

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
			  		@use "@/app/styles/_variables.scss" as *;
					`
			}
		}
	}
});
