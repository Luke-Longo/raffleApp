import { defineStore } from "pinia";
import { ethers } from "ethers";
import { abi } from "../constants/abi";
import Web3Modal from "web3modal";

export const useCryptoStore = defineStore({
	id: "crypto",
	state: () => ({
		address: null as string | null,
		formattedAddress: null as string | null,
		connected: false as boolean,
		balance: null as string,
		loading: false as boolean,
		entranceFee: null as string,
		theme: "light" as string,
		lotteryEntered: false as boolean,
		recentWinner: null as string,
		jackpot: null as string,
		goerliRaffleContractAddress: "0x8D681042DeF5136453a575F26900E2d123F721Ab",
	}),
	actions: {
		async connect() {
			try {
				const providerOptions = {};
				const web3Modal = new Web3Modal({
					cacheProvider: true, // optional
					providerOptions, // required
				});
				const instance = await web3Modal.connect();
				const provider = new ethers.providers.Web3Provider(instance);
				const signer = provider.getSigner();
				provider.on("connect", (info: { chainId: number }) => {
					console.log(info);
				});
				provider.on("disconnect", (error: { code: number; message: string }) => {
					console.log(error);
				});
				const accounts = await provider.listAccounts();
				const address = accounts[0];
				this.address = address;
				this.formattedAddress = address.slice(0, 6) + "..." + address.slice(-4);
				this.connected = true;
				this.balance = await provider.getBalance(address).then((balance) => {
					return ethers.utils.formatEther(balance);
				});
				return {
					provider: provider as ethers.providers.Web3Provider,
					signer: signer as ethers.providers.JsonRpcSigner,
				};
			} catch (error) {
				console.log(error);
			}
		},
		async getContract() {
			try {
				let raffle;
				const { provider, signer } = await this.connect();
				console.log(provider.provider.networkVersion);

				if (provider.provider.networkVersion === "5") {
					raffle = await new ethers.Contract(
						"0x8D681042DeF5136453a575F26900E2d123F721Ab",
						JSON.stringify(abi),
						signer
					);
					console.log(raffle);
				} else if (provider.networkVersion === "31337") {
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
		async getRecentWinner() {
			const raffle = await this.getContract();
			try {
				console.log("getting recent winner");
				let winner = await raffle.getRecentWinner();
				this.recentWinner = winner;
				return winner;
			} catch (error) {
				console.log(error);
			}
		},
		async getJackpot() {
			const { provider } = this.connect();
			console.log(provider);
			try {
				let jackpot = await provider.getBalance(this.goerliRaffleContractAddress);
				this.jackpot = ethers.utils.formatEther(jackpot);
				return jackpot;
			} catch (error) {
				console.log(error);
			}
		},
		async load() {
			this.getJackpot();
			this.getRecentWinner();
			this.getEntranceFee();
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
