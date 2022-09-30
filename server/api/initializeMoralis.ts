import Moralis from "moralis";
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const apiKey = config.private.moralisApiKey;
	Moralis.start({
		apiKey,
		formatEvmAddress: "checksum",
		formatEvmChainId: "decimal",
		logLevel: "verbose",
	});
});
