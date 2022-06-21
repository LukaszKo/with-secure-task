export default function (initialSortKey: string = 'id') {
	const state = useState('sorting', () => ({
		method: 'asc',
		key: initialSortKey,
		list: [],
	}));

	const sortMethod = computed(() => state.value.method);
	const sortKey = computed(() => state.value.key);

	const sortedList = computed(() => {
		return state.value.list.sort((a, b) => {
			switch (sortMethod.value) {
				case 'asc': {
					if (a[sortKey.value] > b[sortKey.value]) {
						return 1;
					}
					if (a[sortKey.value] < b[sortKey.value]) {
						return -1;
					}
					return 0;
				}

				case 'desc':
					if (a[sortKey.value] > b[sortKey.value]) {
						return -1;
					}
					if (a[sortKey.value] < b[sortKey.value]) {
						return 1;
					}
					return 0;
				default:
					return 0;
			}
		});
	});

	function sort({ method, key }: { method: string; key: string }) {
		state.value.method = method;
		state.value.key = key;
	}

	function setList(list: any[]) {
		state.value.list = list;
	}
	return {
		sort,
		setList,
		sortedList,
	};
}
