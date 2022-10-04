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

// //vite.config.js
// import nodePolyfills from "rollup-plugin-polyfill-node";
// const production = process.env.NODE_ENV === "production";

// export default {
//   plugins: [
//     // ↓ Needed for development mode
//     !production &&
//       nodePolyfills({
//         include: ["node_modules/**/*.js", new RegExp("node_modules/.vite/.*js")]
//       })
//   ],

//   build: {
//     rollupOptions: {
//       plugins: [
//         // ↓ Needed for build
//         nodePolyfills()
//       ]
//     },
//     // ↓ Needed for build if using WalletConnect and other providers
//     commonjsOptions: {
//       transformMixedEsModules: true
//     }
//   }
// };
