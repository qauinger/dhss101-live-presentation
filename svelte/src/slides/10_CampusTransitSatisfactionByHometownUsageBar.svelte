<script>
	import data from '$lib/data';
	import CompoundVBars from './_charts/CompoundVBars.svelte';

    let newTo = data.filter(
        d => d.Q8 == ''
    )

    let usedTo = data.filter(
        d => d.Q8 != ''
    )
	
    const usedToBarData = usedTo.map((r) => ({ satisfaction: r['Q12'] }));
	let usedToArray = Object.entries(
		usedToBarData.reduce((counts, item) => {
			counts[item.satisfaction] = (counts[item.satisfaction] || 0) + 1;
			return counts;
		}, {})
	).map(([satisfaction, count]) => ({ satisfaction, count }));

    const newToBarData = newTo.map((r) => ({ satisfaction: r['Q12'] }));
	let newToArray = Object.entries(
		newToBarData.reduce((counts, item) => {
			counts[item.satisfaction] = (counts[item.satisfaction] || 0) + 1;
			return counts;
		}, {})
	).map(([satisfaction, count]) => ({ satisfaction, count }));

    let combined = newToArray.map((item1) => {
        const matchingItem = usedToArray.find(
            (item2) => item2.satisfaction === item1.satisfaction
        );
        return {
            satisfaction: item1.satisfaction,
            newTo: item1.count,
            usedTo: matchingItem ? matchingItem.count : 0,
        };
    });

    combined.push({'satisfaction':'5', 'newTo': 0, 'usedTo': 0 });
    combined = combined.filter(
        d => d.satisfaction.length == 1
    );
</script>

<CompoundVBars
	title="Campus Transit Satisfaction: Hometown Transit Users vs. Non-Users"
	data={combined}
	x={(d) => d['satisfaction']}
	y1={(d) => d['newTo']}
	y2={(d) => d['usedTo']}
	xAxisTitle="Satisfaction Rating"
	xFormat={(d) => d}
	y1AxisTitle={'Hometown Non-Users'}
    y1Color='fill-warning'
	y2AxisTitle={'Hometown Transit Users'}
    y2Color='fill-primary'
	yFormat={(d) => d}
    y2Format={(d) => d}
/>
