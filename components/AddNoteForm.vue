<template>
	<form novalidate>
		<div class="field">
			<input data-cy="title" placeholder="Add note" v-model="form.title" />
			<span class="field-error" v-if="hasSubmited && !form.title"
				>field is required</span
			>
		</div>
		<div class="field">
			<textarea data-cy="content" placeholder="Add content" v-model="form.content" rows="4" />
			<span class="field-error" v-if="hasSubmited && !form.content"
				>field is required</span
			>
		</div>
		<div class="flex">
			<AppButton data-cy="saveNoteButton" class="primary" @click.prevent="save">Save</AppButton>
			<AppButton class="outline primary--text" @click.prevent="cancel"
				>Cancel</AppButton
			>
		</div>
	</form>
</template>
<script lang="ts" setup>
const emit = defineEmits(['onSubmit', 'onCancel']);
const form = reactive({
	title: '',
	content: '',
});

const hasSubmited = ref(false);

const isValid = computed(
	() => hasSubmited.value && !!form.title && !!form.content
);

function resetForm() {
	form.content = '';
	form.title = '';
    hasSubmited.value = false
}

function save() {
	hasSubmited.value = true;

	if (isValid.value) {
		emit('onSubmit', {
			title: form.title,
			content: form.content,
			status: 'New',
		});
		resetForm();
	}
}

function cancel() {
	hasSubmited.value = false;
	emit('onCancel');
}
</script>
<style scoped>
.field-error {
	color: var(--error-color);
    font-size: 0.8rem;
}

.field {
	margin-bottom: 10px;
}

input,
textarea {
	width: 100%;
	padding: 4px 0 4px 4px;
    resize: none;
}
</style>
