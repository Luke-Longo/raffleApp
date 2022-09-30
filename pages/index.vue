<template>
	<div class="dark:bg-black">
		<UiNav @connect="handleConnect" :address="cryptoStore.address" />
		<div class="m-10 p-10">
			<h3 class="header">Lottery Entrance</h3>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCryptoStore } from "../stores/crypto";

const cryptoStore = useCryptoStore();

const handleConnect = async () => {
	console.log("connect");
	await cryptoStore.connectMeta();
};
onMounted(async () => {
	if (window.ethereum.isConnected()) {
		await cryptoStore.connectMeta();
	}
});
</script>

<style>
* {
	@apply dark:bg-black dark:text-white;
}

button {
	@apply dark:hover:bg-gray-700 transition-all px-2 rounded-md py-1;
}
.header {
	@apply text-2xl;
}
</style>
