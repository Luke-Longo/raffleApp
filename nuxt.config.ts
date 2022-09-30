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
	components: true,
	runtimeConfig: {
		public: {
			rpcUrl: process.env.ALCHEMY_RPC_URL,
			moralisServerUrl: process.env.MORALIS_SERVER_URL,
			moralisAppId: process.env.MORALIS_APP_ID,
			contractAddress: process.env.CONTRACT_ADDRESS,
		},
		private: {
			moralisApiKey: process.env.MORALIS_API_KEY,
		},
	},
	plugins: ["~/plugins/moralis.ts"],
});
