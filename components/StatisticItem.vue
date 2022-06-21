<template>
	<div>
		<p class="label">{{ label }}</p>
		<p class="value">{{ value }}</p>
	</div>
</template>
<script setup lang="ts">
const props = defineProps<{
	label: string;
	value: number;
}>();
</script>

<style scoped>
p {
	margin: 0;
}
.label {
	color: var(--info-color);
}

.value {
	font-size: 1.5rem;
}
</style>
