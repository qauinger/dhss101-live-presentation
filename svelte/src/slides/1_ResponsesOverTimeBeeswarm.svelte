<script lang='ts'>
    import data from '$lib/data';
	import { format, PeriodType } from 'svelte-ux';
	import Beeswarm from './_charts/Beeswarm.svelte';
</script>

<Beeswarm
    title='Distribution of Survey Responses Over Time'
    data={data}
    x='StartDate'
    xAxisTitle='Date'
    yAxisTitle='Responses'
    xFormat={(d) => format(d, PeriodType.Day, { variant: "short" })}
    xDomain={[null, null]}
    xGrid
/>
