import { defineConfig } from "vite";
import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill";
import NodeModulesPolyfills from "@esbuild-plugins/node-modules-polyfill";

export default defineConfig({
	optimizeDeps: {
		esbuildOptions: {
			plugins: [
				NodeModulesPolyfills(),
				GlobalsPolyfills({
					process: true,
					buffer: true,
				}),
			],
			define: {
				global: "globalThis",
			},
		},
	},
});
