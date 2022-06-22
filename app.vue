<template>
	<div class="app">
		<Statistics :items="statistics" />
		<AppTable
			:headers="headers"
			:items="sortedList"
			@onAscSort="sortByAsc"
			@onDescSort="sortByDesc"
		>
			<template #head-id="{ item }">
				<input type="checkbox" v-model="allChecked" @change="onAllChecked" />{{
					item.text
				}}</template
			>
			<template #id="{ item }">
				<input
					type="checkbox"
					v-model="item.checked"
					@change="onItemChecked(item)"
				/>
				{{ item.id }}</template
			>
		</AppTable>
		<div class="add-note-button">
			<AppButton data-cy="addNoteButton" @click="appDialog.open()">Add</AppButton>
		</div>
		<AppDialog ref="appDialog">
			<p class="dialog-title">Add note</p>
			<AddNoteForm @onSubmit="submit" @onCancel="appDialog.close()" />
		</AppDialog>
		<AppAlert ref="appAlert">
			<div class="alert-container">
				<span>Do you want to delete this note?</span>
				<div class="flex">
					<AppButton class="outline" @click="hideAlert">No</AppButton>
					<AppButton data-cy="removeNoteButton" class="secondary" @click="removeSelectedNotes"
						>Yes</AppButton
					>
				</div>
			</div>
		</AppAlert>
	</div>
</template>
<script lang="ts" setup>
const { sort, sortedList, setList } = useSorting();
const { fetchNotes, notes, addNote, selectAll, statistics, deselectAll } =
	useNotes();

const headers = [
	{
		key: 'id',
		text: 'ID',
	},
	{
		key: 'title',
		text: 'Title',
	},
	{
		key: 'content',
		text: 'Content',
	},
	{
		key: 'status',
		text: 'Status',
	},
];

const appDialog = ref(null);
const appAlert = ref(null);
const allChecked = ref(false);

await fetchNotes();

watch(
	() => notes.value,
	(newVal) => {
		setList(newVal);
	},
	{
		immediate: true,
	}
);

function submit(data) {
	addNote(data);
	appDialog.value.close();
}

function onAllChecked() {
	if (allChecked.value) {
		appAlert.value.show();
		selectAll(true);
	} else {
		selectAll(false);
		appAlert.value.hide();
	}
}

function onItemChecked(item) {
	item.checked ? appAlert.value.show() : appAlert.value.hide();
}

function hideAlert() {
	selectAll(false);
	reset();
}

function removeSelectedNotes() {
	deselectAll();
	reset();
}

function reset() {
	appAlert.value.hide();
	allChecked.value = false;
}

function sortByAsc(key: string) {
	sort({ method: 'asc', key });
}

function sortByDesc(key: string) {
	sort({ method: 'desc', key });
}
</script>
<style scoped>
.app {
	padding: 40px;
}

.alert-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.add-note-button {
	display: flex;
	justify-content: flex-end;
}

.dialog-title {
	font-size: 1.2rem;
}
</style>
