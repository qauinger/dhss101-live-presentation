<script lang='ts'>
    import data from '$lib/data';
	import { format, PeriodType } from 'svelte-ux';
	import Beeswarm from './_charts/Beeswarm.svelte';

    const filteredData = data.filter(
        d => d['Duration (in seconds)'] <= 600
    );
</script>

<Beeswarm
    title='Responses Duration. (Under 10 minutes)'
    data={filteredData}
    x={(d) => (d['Duration (in seconds)'])}
    xAxisTitle='Duration'
    yAxisTitle='Responses'
    xDomain={[0, null]}
    xFormat={(d) => ((Math.floor(d / 60) != 0 || d % 60 == 0 ? Math.floor(d / 60) + "m" : "") + (d % 60 != 0 ? " " + Math.round(d % 60) + "s" : ""))}
    xGrid
    average
/>
