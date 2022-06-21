<template>
	<div id="myModal" class="modal" ref="modal">
		<div class="modal-content">
			<slot />
		</div>
	</div>
</template>
<script lang="ts" setup>
const modal = ref(null);

function open() {
	modal.value.style.display = 'block';
}

function close() {
	modal.value.style.display = 'none';
}

defineExpose({
	open,
	close,
});
</script>
<style scoped>
.modal {
	display: none;
	position: fixed;
	z-index: 1;
	padding-top: 100px;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
	background-color: var(--secondary-color);
	margin: auto;
	padding: 20px;
	border: 1px solid var(--secondary-color);
	width: 40%;
	border-radius: 4px;
}
</style>
