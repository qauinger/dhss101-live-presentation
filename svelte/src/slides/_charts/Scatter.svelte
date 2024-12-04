<script lang='ts'>
	import { Axis, Chart, Points, Svg, Highlight, Tooltip, Rule, Text } from 'layerchart';
	import QChart from './Q/QChart.svelte';
	import { scaleTime } from 'd3-scale';
	import { formatDate, PeriodType, type FormatType } from 'svelte-ux';
	import { mean } from 'd3-array';
	import QAxes from './Q/QAxes.svelte';

    export let title: string;
    export let data: any;
    export let x: string;
    export let y: string;
    export let xAxisTitle: string;
    export let yAxisTitle: string;
    export let xFormat: FormatType | undefined;
    export let yFormat: FormatType | undefined;
    export let xGrid: boolean = false;
    export let yGrid: boolean = false;
</script>

<QChart title={title}>
    <Chart
        data={data}
        x={x}
        xNice
        y={y}
        yNice

        tooltip={{ mode: "bisect-x" }}
        padding={{ top: 10, bottom: 40, left: 50, right: 50 }}

        let:xScale
        let:height
    >
        <Svg>
            <QAxes xLabel={xAxisTitle} yLabel={yAxisTitle} xFormat={xFormat} yFormat={yFormat} xGrid={xGrid} yGrid={yGrid}/>
            <Points class="fill-primary/10 stroke-primary" />
            <Highlight points lines />
        </Svg>
        <Tooltip.Root let:data>
            <Tooltip.Header>{formatDate(data.date, PeriodType.Day)}</Tooltip.Header>
            <Tooltip.List>
                <Tooltip.Item label="value" value={data.value} />
            </Tooltip.List>
        </Tooltip.Root>
    </Chart>
</QChart>
