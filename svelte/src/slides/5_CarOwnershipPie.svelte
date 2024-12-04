<script lang="ts">
	import Pie from './_charts/Pie.svelte';
	import data from '$lib/data';

	const pieData = data.map((r) => ({ ownership: r['Q2'] }));
	const ownershipCountsArray = Object.entries(
		pieData.reduce((counts, item) => {
			counts[item.ownership] = (counts[item.ownership] || 0) + 1;
			return counts;
		}, {})
	).map(([ownership, count]) => ({ ownership, count }));
</script>

<Pie
    title="Car Ownership Among Respondents"
    data={ownershipCountsArray}
    x='count'
    c='ownership'
    cRange='{['#2077F0', '#FFB62C', '#4BCE61']}'
/>
