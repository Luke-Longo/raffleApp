<template>
	<div class="dark:bg-black">
		<UiNav @connect="handleConnect" />
		<ClientOnly>
			<div>
				<LotteryEntrance />
			</div>
		</ClientOnly>
		<div
			v-if="cryptoStore.loading"
			class="flex flex-grow mt-40 justify-center trans bg-darkBg bg-opacity-30"
		>
			<UiBaseSpinner />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCryptoStore } from "~~/stores/crypto";

const cryptoStore = useCryptoStore();

onMounted(async () => {
	await cryptoStore.load();
	cryptoStore.toggleTheme();
});

const handleConnect = async () => {
	await cryptoStore.connect();
};
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
