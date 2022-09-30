import Moralis from "moralis";
(window as any).global = window;

export default defineNuxtPlugin(async () => {
	const config = useRuntimeConfig();

	await Moralis.start({
		apiKey: config.private.moralisApiKey,
		formatEvmAddress: "checksum",
		formatEvmChainId: "decimal",
		logLevel: "verbose",
	});
	return {
		provide: {
			Moralis,
		},
	};
});
