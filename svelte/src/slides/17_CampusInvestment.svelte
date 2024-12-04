<script>
	import data from '$lib/data';
	import HBars from './_charts/HBars.svelte';
	import VBars from './_charts/VBars.svelte';

	const barData = data.map((r) => ({ mode: r['Q16'].split(',') }));
	console.log(barData);

	const flattenedModes = barData.flatMap((entry) => entry.mode);

	// Count occurrences of each mode
	const modeCounts = flattenedModes.reduce((acc, mode) => {
		acc[mode] = (acc[mode] || 0) + 1;
		return acc;
	}, {});

	let output = Object.entries(modeCounts).map(([mode, count]) => ({
		mode,
		value: count
	}));

    output = output.filter(d => d.mode != '')
    output.sort((a, b) => b.value - a.value);

	console.log(output);
</script>

<HBars
	title="Attitudes on the Benefits of Investing in Campus Public Transit"
	data={output}
	x={(d) => d.value}
    leftpad={600}
	y={(d) => d.mode}
	xAxisTitle="Count"
	yAxisTitle="Reason"
	xFormat={(d) => d}
	yFormat={(d) => d}
    xGrid
/>