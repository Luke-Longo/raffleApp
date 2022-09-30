<template>
	<div>
		<div class="flex flex-row justify-between h-20 items-center mx-10 mt-5">
			<div class="text-2xl">Decentralized Raffle</div>

			<div class="text-lg flex gap-6 justify-center items-center">
				<div>Wallet:</div>
				<div
					class="rounded dark:bg-gray-700 px-2 py-1 dark:hover:bg-gray-500 hover:cursor-pointer trans"
					@click="handleConnect"
				>
					Connect
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
	(e: "connect");
}>();

const handleConnect = () => {
	emit("connect");
};
</script>
