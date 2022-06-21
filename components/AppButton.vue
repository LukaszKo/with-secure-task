<template>
	<button class="primary"><slot /></button>
</template>
<style scoped>
button {
	padding: 8px 48px;
	border: none;
	cursor: pointer;
	border-radius: 4px;
}

.primary {
	background: var(--primary-color);
	color: var(--secondary-color);
}

.outline {
	border: 1px solid var(--secondary-color);
	background: inherit;
	color: var(--secondary-color);
}

.primary--text {
	color: var(--primary-color);
}

.secondary {
	background: var(--secondary-color);
	color: var(--error-color);
}
</style>
