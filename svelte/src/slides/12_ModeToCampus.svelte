<script>
	import data from '$lib/data';
	import VBars from './_charts/VBars.svelte';

	const barData = data.map((r) => ({ mode: r['Q10'].split(',') }));
	console.log(barData);

	const flattenedModes = barData.flatMap((entry) => entry.mode);

	// Count occurrences of each mode
	const modeCounts = flattenedModes.reduce((acc, mode) => {
		acc[mode] = (acc[mode] || 0) + 1;
		return acc;
	}, {});

	const output = Object.entries(modeCounts).map(([mode, count]) => ({
		mode,
		value: count
	}));

	console.log(output);
</script>

<VBars
	title="Mode of Transportation to Campus"
	data={output}
	x={(d) => d.mode}
	y={(d) => d.value}
	xAxisTitle="Mode"
	yAxisTitle="Count"
	xFormat={(d) => d}
	yFormat={(d) => d}
/>
