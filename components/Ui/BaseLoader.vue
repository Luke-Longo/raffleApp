<template>
	<UiBaseModal :show="show" title="Loading..." :actions="false">
		<UiBaseSpinner
			class="flex items-center justify-center"
			v-if="show"
		></UiBaseSpinner>
	</UiBaseModal>
</template>

<script setup lang="ts">
const props = defineProps<{
	show: boolean;
}>();
</script>
