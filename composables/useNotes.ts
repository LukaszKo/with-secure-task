interface Note {
	id: number;
	title: string;
	status: string;
	content: string;
	checked: boolean;
}

export default function () {
	const state = useState('notes', () => ({
		notes: [],
	}));

	async function fetchNotes() {
		const { data: notes } = await useFetch('/api/notes');
		state.value.notes = notes;
	}

	const statistics = computed(() => [
		{
			label: 'Total',
			value: state.value.notes.length,
		},
		{
			label: 'Completed',
			value: state.value.notes.filter((note) => note.status === 'Completed')
				.length,
		},
		{
			label: 'Not completed',
			value: state.value.notes.filter((note) => note.status === 'Not completed')
				.length,
		},
	]);

	function selectAll(select: boolean) {
		state.value.notes = state.value.notes.map((note) => {
			note.checked = select;
			return note;
		});
	}

	function deselectAll() {
		state.value.notes = state.value.notes.filter((note) => !note.checked);
	}

	function addNote(data: Note) {
		state.value.notes.push({ id: generateId(), ...data });
	}

	function generateId() {
		const min = Math.ceil(10);
		const max = Math.floor(1000);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	return {
		fetchNotes,
		selectAll,
		deselectAll,
		addNote,
		statistics,
		notes: computed(() => state.value.notes),
	};
}
