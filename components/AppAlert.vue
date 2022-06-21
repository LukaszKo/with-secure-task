<template>
	<div class="alert" ref="alertRef">
		<slot />
	</div>
</template>
<script lang="ts" setup>
const alertRef = ref(null);

function show() {
	alertRef.value.style.display = 'block';
}

function hide() {
	alertRef.value.style.display = 'none';
}
defineExpose({
	show,
	hide,
});
</script>
<style scoped>
.alert {
	display: none;
	position: fixed;
	bottom: 20px;
	right: 40px;
	padding: 10px;
	background: var(--error-color);
	color: var(--secondary-color);
	width: 50vw;
	border-radius: 4px;
}
</style>
