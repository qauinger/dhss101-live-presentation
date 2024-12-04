<script lang='ts'>
    import data from '$lib/data';
	import { format, PeriodType } from 'svelte-ux';
	import Beeswarm from './_charts/Beeswarm.svelte';


</script>

<Beeswarm
    title='Responses by Time of Day.'
    data={data}
    x={(d) => (new Date(d.StartDate).getHours())}
    xDomain={[null, null]}
    xAxisTitle='Hour of Day'
    yAxisTitle='Responses'
    xFormat={(d) => ((d > 12 ? d - 12 : d) + (d >= 12 ? 'pm' : 'am'))}
    xGrid
/>
