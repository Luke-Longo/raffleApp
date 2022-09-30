<template>
	<div class="half-circle-spinner">
		<div class="circle circle-1"></div>
		<div class="circle circle-2"></div>
	</div>
</template>

<style scoped>
.half-circle-spinner,
.half-circle-spinner * {
	box-sizing: border-box;
}

.half-circle-spinner {
	width: 125px;
	height: 125px;
	border-radius: 100%;
	position: relative;
}

.half-circle-spinner .circle {
	content: "";
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 100%;
	border: calc(110px / 10) solid transparent;
}

.half-circle-spinner .circle.circle-1 {
	@apply border-t-primary dark:border-t-darkPrimary;
	animation: half-circle-spinner-animation 1s infinite;
}

.half-circle-spinner .circle.circle-2 {
	@apply border-b-primary dark:border-b-darkPrimary;
	animation: half-circle-spinner-animation 1s infinite alternate;
}

@keyframes half-circle-spinner-animation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
