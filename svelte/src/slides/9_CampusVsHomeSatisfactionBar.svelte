<script>
	import data from '$lib/data';
	import CompoundVBars from './_charts/CompoundVBars.svelte';

    let useBoth = data.filter(
        d => d.Q8 != '' && d.Q12 != ''
    )

    console.log(useBoth)

	let allSatisfaction = [...new Set(useBoth.flatMap((item) => [item.Q8, item.Q12]))];

	let output = allSatisfaction.map((satisfaction) => {
		const Q8Count = useBoth.filter((item) => item.Q8 === satisfaction).length;
		const Q12Count = useBoth.filter((item) => item.Q12 === satisfaction).length;

		return { satisfaction, Q8: Q8Count, Q12: Q12Count };
	});

    output = output.filter(
        d => d.satisfaction.length == 1
    );

    output.sort((a, b) => a.satisfaction - b.satisfaction);
</script>

<CompoundVBars
	title="Comparison of Satisfaction Ratings: Hometown vs. Campus Transit Systems (Hometown Transit Users)"
	data={output}
	x={(d) => d['satisfaction']}
	y1={(d) => d['Q12']}
	y2={(d) => d['Q8']}
	xAxisTitle="Satisfaction Rating"
	xFormat={(d) => d}
	y1AxisTitle={'RIT Campus'}
    y1Color='fill-warning'
	y2AxisTitle={'Hometown'}
    y2Color='fill-primary'
	yFormat={(d) => d}
	y2Format={(d) => d}
/>
