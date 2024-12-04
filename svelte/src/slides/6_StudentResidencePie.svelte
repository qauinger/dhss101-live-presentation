<script lang="ts">
	import Pie from './_charts/Pie.svelte';
	import data from '$lib/data';

	const pieData = data.map((r) => ({ living: r['Q3'] }));
	const livingCountsArray = Object.entries(
		pieData.reduce((counts, item) => {
			counts[item.living] = (counts[item.living] || 0) + 1;
			return counts;
		}, {})
	).map(([living, count]) => ({ living, count }));
</script>

<Pie
    title="Student Residence Distribution"
    data={livingCountsArray}
    x='count'
    c='living'
    cRange='{['#2077F0', '#FFB62C', '#4BCE61']}'
/>
