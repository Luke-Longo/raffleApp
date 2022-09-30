import { ethers } from "ethers";
import { Web3Provider, JsonRpcSigner } from "@ethersproject/providers";

export default async function useCrypto() {
	const provider = ref(null as Web3Provider);
	const signer = ref(null as JsonRpcSigner);
	const connectMeta = async () => {
		try {
			await window.ethereum.enable();
			provider.value = new ethers.providers.Web3Provider(window.ethereum);
			signer.value = provider.value.getSigner();
		} catch (error) {
			console.log(error);
		}
		return { provider, signer };
	};

	return {
		provider,
		signer,
		connectMeta,
	};
}
