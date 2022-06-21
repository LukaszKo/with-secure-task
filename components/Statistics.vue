<template>
	<section>
		<StatisticItem
			v-for="item in items"
			:key="item.label"
			:label="item.label"
			:value="item.value"
		></StatisticItem>
	</section>
</template>
<script setup lang="ts">
interface Item {
	label: string;
	value: number;
}
defineProps<{
	items: Item[];
}>();
</script>
<style scoped>
section {
	width: 50vw;
	background: var(--secondary-color);
	border: 1px solid var(--info-color);
	padding: 20px;
	display: flex;
	justify-content: space-between;
}
</style>
