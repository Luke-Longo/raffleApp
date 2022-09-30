import { ethers } from "ethers";
import { Web3Provider, JsonRpcSigner } from "@ethersproject/providers";

export default async function useCrypto() {
	let provider: Web3Provider;
	let signer: JsonRpcSigner;
	const connectMeta = async () => {};
	if (!!window.ethereum) {
		provider = await new ethers.providers.Web3Provider((window as any).ethereum);
		signer = await provider.getSigner();
	}

	return {
		provider,
		signer,
	};
}
