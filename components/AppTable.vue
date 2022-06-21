<template>
	<table>
		<thead>
			<tr>
				<th v-for="header in headers" :key="header.key">
					<slot :name="`head-${header.key}`" :item="header">
						{{ header.text }}
					</slot>
					<span class="sort-asc" @click="onAscendingSort(header.key)"></span>
					<span class="sort-desc" @click="onDescendingSort(header.key)"></span>
				</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="item in items" :key="item.id">
				<td v-for="header in headers" :key="header.key">
					<slot :name="header.key" :item="item">
						{{ item[header.key] }}
					</slot>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script lang="ts" setup>
interface Header {
	key: string;
	text: string;
}
const emits = defineEmits(['onAscSort', 'onDescSort']);

defineProps<{
	headers: Header[];
	items: any[];
}>();

function onAscendingSort(key: string) {
	emits('onAscSort', key);
}

function onDescendingSort(key: string) {
	emits('onDescSort', key);
}
</script>
<style scoped>
table {
	margin: 20px 0;
	border-collapse: collapse;
	width: 100%;
}

table td,
th {
	--border-color: #ddd;
	border: 1px solid var(--border-color);
	padding: 8px;
}

table th {
	--header-bg-color: gray;
	background: var(--header-bg-color);
	color: var(--secondary-color);
	font-weight: normal;
	padding: 4px;
}

th span,
td span {
	display: block;
	width: 100%;
}
th span.sort-asc,
span.sort-desc {
	position: relative;
	cursor: pointer;
}
span.sort-asc:before,
span.sort-desc:after {
	border: 4px solid transparent;
	content: '';
	display: block;
	height: 0;
	right: 5px;
	top: 50%;
	position: absolute;
	width: 0;
}
span.sort-asc:before {
	--border-color: white;
	border-bottom-color: var(--border-color);
	margin-top: -18px;
}
span.sort-desc:after {
	--border-color: white;
	border-top-color: var(--border-color);
	margin-top: -8px;
}
</style>
