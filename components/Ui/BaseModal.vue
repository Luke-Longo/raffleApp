<template>
	<teleport to="body">
		<transition name="modal-fade">
			<div class="modal-backdrop" v-if="show">
				<div class="mx-auto flex justify-center" role="dialog" v-if="show">
					<UiCard class="modal w-80 h-72">
						<header
							class="text-center text-2xl mt-4 mb-8 px-4 mx-auto text-primary dark:text-darkSecondary flex justify-center items-center"
						>
							<h2>{{ title }}</h2>
						</header>
						<div class="py-4 flex justify-center text-center mb-4">
							<slot></slot>
						</div>
						<div v-if="actions" class="flex justify-evenly items-center">
							<UiButton :mode="'reverse'" @click="cancel">Cancel</UiButton>
							<UiButton @click="confirm">Confirm</UiButton>
						</div>
					</UiCard>
				</div>
			</div>
		</transition>
	</teleport>
</template>

<script setup lang="ts">
interface Props {
	show: boolean;
	title?: string;
	actions?: boolean;
	fixed?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "confirm");
	(e: "cancel");
}>();
const confirm = () => {
	emit("confirm");
};
const cancel = () => {
	emit("cancel");
};
</script>

<style scoped>
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	overflow-x: auto;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
	opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity 0.5s ease;
}
</style>
