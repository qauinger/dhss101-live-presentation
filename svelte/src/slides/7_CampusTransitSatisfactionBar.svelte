<script>
	import VBars from "./_charts/VBars.svelte";
    import data from '$lib/data';
	import { likertEmoji } from "./_charts/util/utils";

    const barData = data.map((r) => ({ satisfaction: r['Q12'] }));
	let satisfactionCountsArray = Object.entries(
		barData.reduce((counts, item) => {
			counts[item.satisfaction] = (counts[item.satisfaction] || 0) + 1;
			return counts;
		}, {})
	).map(([satisfaction, count]) => ({ satisfaction, count }));

    satisfactionCountsArray.push({'satisfaction':'5', 'count': 0});
    satisfactionCountsArray = satisfactionCountsArray.filter(
        d => d.satisfaction.length == 1
    );
</script>

<VBars 
    title="Satisfaction Ratings for Campus Transit (All responses)"
    data={satisfactionCountsArray}
    x={(d) => (d['satisfaction'])}
    y={(d) => (d['count'])}
    xAxisTitle='Satisfaction Rating'
    xFormat={(d) => (d)}
    yAxisTitle='Count'
    yColor='fill-primary'
    yFormat={(d) => (d)}
    yGrid
/>