<script>
	import VBars from "./_charts/VBars.svelte";
    import data from '$lib/data';

    const barData = data.map((r) => ({ satisfaction: r['Q8'] }));
	let satisfactionCountsArray = Object.entries(
		barData.reduce((counts, item) => {
			counts[item.satisfaction] = (counts[item.satisfaction] || 0) + 1;
			return counts;
		}, {})
	).map(([satisfaction, count]) => ({ satisfaction, count }));

    satisfactionCountsArray = satisfactionCountsArray.filter(
        d => d.satisfaction.length == 1
    );
</script>

<VBars 
    title="Satisfaction Ratings for Hometown Transit (Users Only)"
    data={satisfactionCountsArray}
    x={(d) => (d['satisfaction'])}
    y={(d) => (d['count'])}
    xAxisTitle='Satisfaction Rating'
    xFormat={(d) => (d)}
    yAxisTitle='Count'
    yFormat={(d) => (d)}
    yGrid
/>