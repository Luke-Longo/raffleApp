<template>
	<div class="m-10 p-10 flex flex-col gap-5">
		<h3 class="header">Lottery Entrance (Goerli Testnet)</h3>
		<div class="flex justify-center items-center gap-2">
			Need ETH?
			<a class="underline" href="https://goerlifaucet.com/" target="_blank">
				Get some here!</a
			>
		</div>
		<client-only>
			<div class="flex gap-5 justify-center items-center">
				<div>Current Entrance Fee is {{ cryptoStore.entranceFee }} ETH</div>
				<button @click="handleEnter">Enter Lottery</button>
			</div>
			<div class="flex justify-center">
				<p>Number of Players: {{ cryptoStore.players }}</p>
			</div>
			<div class="flex gap-5 justify-center items-center">
				Current Jackpot: {{ cryptoStore.jackpot }} ETH
			</div>
			<div class="flex gap-5 justify-center items-center">
				Recent Winner: {{ cryptoStore.recentWinner }}
			</div>
		</client-only>
	</div>
</template>

<script setup lang="ts">
import { useCryptoStore } from "~~/stores/crypto";

const cryptoStore = useCryptoStore();
await cryptoStore.getEntranceFee();

const handleEnter = async () => {
	console.log("Entering Lottery");
	await cryptoStore.enterLottery();
	await cryptoStore.listenEnter();
};
</script>
