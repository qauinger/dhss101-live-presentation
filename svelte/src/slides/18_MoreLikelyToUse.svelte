<script>
	import data from '$lib/data';
	import HBars from './_charts/HBars.svelte';
	import VBars from './_charts/VBars.svelte';

	const barData = data.map((r) => ({ mode: r['Q15'].split(',') }));
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
	title="Factors That Would Increase Likelihood of Using Campus Public Transit"
	data={output}
	x={(d) => d.value}
    leftpad={300}
	y={(d) => d.mode}
	xAxisTitle="Count"
	yAxisTitle="Factor"
	xFormat={(d) => d}
	yFormat={(d) => d}
	xGrid
/>