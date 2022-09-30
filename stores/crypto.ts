import { defineStore } from "pinia";
import { ethers } from "ethers";

export const useCryptoStore = defineStore({
	id: "crypto",
	state: () => ({
		accounts: [] as ethers.providers.JsonRpcSigner[],
		provider: null,
		signer: null,
		address: null,
		formattedAddress: null,
		connected: false,
		balance: null,
	}),

	actions: {
		async connectMeta() {
			try {
				this.accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});

				this.provider = await new ethers.providers.Web3Provider(window.ethereum);
				this.signer = this.provider.getSigner();
				let address = await this.signer.getAddress();
				this.address = address;
				this.formattedAddress = address.slice(0, 6) + "..." + address.slice(-4);
				this.connected = true;
				this.getBalance();
			} catch (error) {
				console.log(error);
			}
		},
		async getBalance() {
			try {
				let provider = await new ethers.providers.Web3Provider(window.ethereum);
				let balance = await provider.getBalance(this.address);
				this.balance = ethers.utils.formatEther(balance).slice(0, 8);
			} catch (error) {
				console.log(error);
			}
		},
	},
});
