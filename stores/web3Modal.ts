import { defineStore } from "pinia";
import { getLibrary } from "@/utils/web3";
import { ethers } from "ethers";
import { parseInt } from "lodash";

export default defineStore("web3Modal", {
	state: () => ({
		web3Modal: null,
		library: getLibrary(),
		active: false,
		account: null,
		chainId: 0,
	}),
	actions: {
		async connect({ state, commit, dispatch }) {
			const provider = await state.web3Modal.connect();

			const library = new ethers.providers.Web3Provider(provider);

			library.pollingInterval = 12000;
			this.library = library;

			const accounts = await library.listAccounts();
			if (accounts.length > 0) {
				this.account = accounts[0];
			}
			const network = await library.getNetwork();
			this.chainId = network.chainId;
			this.active = true;
			provider.on("connect", async (info) => {
				const chainId = parseInt(info.chainId);
				this.chainId = chainId;
				console.log("connect", info);
			});

			provider.on("accountsChanged", async (accounts) => {
				if (accounts.length > 0) {
					this.account = accounts[0];
				} else {
					await this.resetApp();
				}
				console.log("accountsChanged");
			});
			provider.on("chainChanged", async (chainId) => {
				chainId = parseInt(chainId);
				this.chainId = chainId;
				console.log("chainChanged", chainId);
			});
		},
		async resetApp() {
			try {
				await this.web3Modal.clearCachedProvider();
			} catch (error) {
				console.error(error);
			}
			this.account = null;
			this.active = false;
			this.library = getLibrary();
		},
	},
});
