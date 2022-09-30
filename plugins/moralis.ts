import Moralis from "moralis";

export default defineNuxtPlugin(async () => {
	const config = useRuntimeConfig();

	await Moralis.start({
		apiKey: config.public.moralisApiKey,
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
