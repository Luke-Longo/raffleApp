<template>
	<div class="border-b-2">
		<div class="flex flex-row justify-between h-20 items-center mx-10 mt-5">
			<div class="text-2xl">Decentralized Raffle</div>
			<div class="text-lg flex gap-6 justify-center items-center">
				<transition name="fade" mode="out-in">
					<div
						class="icon"
						v-if="cryptoStore.theme === 'light'"
						@click="cryptoStore.toggleTheme"
					>
						Dark
					</div>
					<div class="icon" v-else @click="cryptoStore.toggleTheme">Light</div>
				</transition>
				<div class="trans flex gap-4">
					<div>{{ cryptoStore.balance }}</div>
					<div>{{ cryptoStore.formattedAddress }}</div>
				</div>
				<transition name="fade" mode="out-in">
					<div
						class="rounded dark:bg-gray-700 px-2 py-1 dark:hover:bg-gray-500 hover:cursor-pointer trans"
						@click="handleConnect"
						v-if="!cryptoStore.connected"
					>
						Connect
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCryptoStore } from "~~/stores/crypto";

const cryptoStore = useCryptoStore();
const emit = defineEmits<{
	(e: "connect");
	(e: "disconnect");
}>();

const handleConnect = () => {
	emit("connect");
};
</script>
