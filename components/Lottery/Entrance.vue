<template>
	<div class="m-10 p-10 flex flex-col gap-5">
		<h3 class="header">Lottery Entrance</h3>
		<client-only>
			<div class="flex gap-5 justify-center items-center">
				<div>Current Entrance Fee is {{ cryptoStore.entranceFee }} ETH</div>
				<button @click="handleEnter">Enter Lottery</button>
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
};
</script>
