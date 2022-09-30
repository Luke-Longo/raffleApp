export default defineNuxtConfig({
	modules: [
		"@nuxtjs/tailwindcss",
		[
			"@pinia/nuxt",
			{
				autoImports: [
					// automatically imports `defineStore`
					"defineStore", // import { defineStore } from 'pinia'
				],
			},
		],
	],
	css: ["@/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	runtimeConfig: {
		public: {
			rpcUrl: process.env.ALCHEMY_RPC_URL,
		},
		private: {
			moralisApiKey: process.env.MORALIS_API_KEY,
		},
	},
});
