import { defineStore } from "pinia";
import { ethers } from "ethers";

export const useCryptoStore = defineStore({
	id: "crypto",
	state: () => ({
		provider: null,
		signer: null,
		address: null,
		connected: false,
	}),
	actions: {
		async connectMeta() {
			try {
				await window.ethereum.enable();
				this.provider = new ethers.providers.Web3Provider(window.ethereum);
				this.signer = this.provider.getSigner();
				this.address = await this.signer.getAddress();
				this.connected = true;
			} catch (error) {
				console.log(error);
			}
		},
	},
});
