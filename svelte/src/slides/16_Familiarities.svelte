<script lang='ts'>
	import data from '$lib/data';
	import CompoundVBars from './_charts/CompoundVBars.svelte';

    let useBoth = data.filter(
        d => d.Q4 != '' && d.Q5 != ''
    )

	let fams = [
		'Unfamiliar – I am still new to the area',
		'Not familiar – I’ve just moved here for college',
		'Somewhat familiar – I’ve been here for a while but am still learning',
		'Very familiar – I’ve lived here for many years',
	]

	function famToNum(fam: string) {
		return fams.indexOf(fam);
	}

	let allFamiliarities = [...new Set(useBoth.flatMap((item) => [item.Q4, item.Q5]))];

	let output = allFamiliarities.map((familiarity) => {
		const Q4Count = useBoth.filter((item) => item.Q4 === familiarity).length;
		const Q5Count = useBoth.filter((item) => item.Q5 === familiarity).length;

		return { 'familiarity':famToNum(familiarity), Q4: Q4Count, Q5: Q5Count };
	});

    output.sort((a, b) => a.familiarity - b.familiarity);
</script>

<CompoundVBars
	title="Respondent Familiarity of Henrietta and Rochester"
	data={output}
	x={(d) => d['familiarity']}
	y1={(d) => d['Q4']}
	y2={(d) => d['Q5']}
	xAxisTitle="Familiarity"
	xFormat={(d) => (fams[d].split('–')[0])}
	y1AxisTitle={'Henrietta'}
    y1Color='fill-primary'
	y2AxisTitle={'Rochester'}
    y2Color='fill-warning'
	yFormat={(d) => d}
	y2Format={(d) => d}
/>