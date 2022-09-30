<template>
	<div class="dark:bg-black">
		<Nav @connect="handleConnect" />
		<web3-modal-vue
			ref="web3modal"
			:theme="theme"
			:provider-options="providerOptions"
			cache-provider
		/>
	</div>
</template>

<script setup lang="ts">
import Nav from "@/components/Ui/Nav.vue";
import web3Modal from "web3modal-vue3/src/components/Modal.vue";

// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { web3Modal } from "./config/mixins";

console.log(web3Modal);

const handleConnect = async () => {
	console.log("connect");
};
</script>

<style>
* {
	@apply dark:bg-black dark:text-white;
}

button {
	@apply dark:hover:bg-gray-700 transition-all px-2 rounded-md py-1;
}
</style>
