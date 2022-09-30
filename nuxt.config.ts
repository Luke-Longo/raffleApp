export default defineNuxtConfig({
	head: {},
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
	components: true,
	runtimeConfig: {
		public: {
			rpcUrl: process.env.ALCHEMY_RPC_URL,
			contractAddress: process.env.CONTRACT_ADDRESS,
			moralisApiKey: process.env.MORALIS_API_KEY,
		},
		private: {
			moralisApiKey: process.env.MORALIS_API_KEY,
		},
	},
	plugins: ["~/plugins/moralis.ts"],
});
