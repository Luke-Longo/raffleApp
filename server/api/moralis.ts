import Moralis from "moralis";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	try {
		Moralis.start({
			apiKey: config.private.moralisApiKey,
		});
		console.log("Moralis", Moralis);
	} catch (error) {
		console.log(error);
	}

	return "hello";
});
