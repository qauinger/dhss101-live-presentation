<script lang='ts'>
    import data from '$lib/data';
	import { format, PeriodType } from 'svelte-ux';
	import LineArea from './_charts/LineArea.svelte';

    let times = data.map((r) => ({'date': new Date(r.StartDate)}));
    times.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    times = times.map((r, i) => ({'date': r.date, 'count': i}));
</script>

<LineArea
    title='Response Total Over Time'
    data={times}

    x='date'
    y='count'
    xAxisTitle='Date'
    xFormat={(d) => format(d, PeriodType.Day, { variant: "short" })}
    yFormat='integer'
    yAxisTitle='Responses'
    xGrid
/>