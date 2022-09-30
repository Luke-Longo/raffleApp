import { defineStore } from "pinia";
import { ethers } from "ethers";
import { abi } from "../constants/abi";

export const useCryptoStore = defineStore({
	id: "crypto",
	state: () => ({
		accounts: [] as ethers.providers.JsonRpcSigner[],
		provider: null as ethers.providers.Web3Provider | null,
		signer: null as ethers.providers.JsonRpcSigner | null,
		address: null as string | null,
		formattedAddress: null as string | null,
		connected: false as boolean,
		balance: null as string,
		loading: false as boolean,
		entranceFee: null as string,
		theme: "light" as string,
	}),
	actions: {
		async connectMeta() {
			try {
				this.provider = new ethers.providers.Web3Provider(window.ethereum);
				this.accounts = this.provider.send("eth_requestAccounts", []);
				this.signer = await this.provider.getSigner();
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
		async getContract() {
			try {
				let raffle;
				let provider = await new ethers.providers.Web3Provider(window.ethereum);
				let signer = await provider.getSigner();
				if (provider.provider.networkVersion === "5") {
					raffle = await new ethers.Contract(
						"0x8D681042DeF5136453a575F26900E2d123F721Ab",
						JSON.stringify(abi),
						signer
					);
					console.log(raffle);
				} else if (provider.provider.networkVersion === "31337") {
					raffle = await new ethers.Contract(
						"0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
						JSON.stringify(abi),
						signer
					);
				}
				return raffle;
			} catch (error) {
				console.log(error);
			}
		},
		async enterLottery() {
			this.loading = true;
			try {
				const raffle = await this.getContract();
				let tx = await raffle.enterRaffle({
					value: ethers.utils.parseEther("0.1"),
				});
				await tx.wait();
				console.log("You have entered the lottery!");
				this.loading = false;
			} catch (error) {
				console.log(error);
			}
		},
		async getEntranceFee() {
			try {
				const raffle = await this.getContract();
				let entranceFee = await raffle.getEntranceFee();
				this.entranceFee = ethers.utils.formatEther(entranceFee);
				return entranceFee;
			} catch (error) {
				console.log(error);
			}
		},
		setTheme(theme: string) {
			document.documentElement.classList.add(theme);
			localStorage.theme = theme;
			this.theme = theme;
		},
		toggleTheme() {
			if (this.theme === "dark") {
				document.documentElement.classList.remove("dark");
				localStorage.theme = "light";
				this.theme = "light";
			} else if (this.theme === "light") {
				document.documentElement.classList.add("dark");
				localStorage.theme = "dark";
				this.theme = "dark";
			}
		},
	},
});
