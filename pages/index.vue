<template>
	<div class="dark:bg-black">
		<Nav @connect="handleConnect" :address="cryptoStore.address" />
		<div>
			<div>
				<button @click="getWalletData">Get Wallet Data</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Nav from "../components/Ui/Nav.vue";
import { useCryptoStore } from "../stores/crypto";

const cryptoStore = useCryptoStore();

const handleConnect = async () => {
	console.log("connect");
	await cryptoStore.connectMeta();
};
onMounted(async () => {
	await cryptoStore.connectMeta();
});
</script>

<style>
* {
	@apply dark:bg-black dark:text-white;
}

button {
	@apply dark:hover:bg-gray-700 transition-all px-2 rounded-md py-1;
}
</style>
