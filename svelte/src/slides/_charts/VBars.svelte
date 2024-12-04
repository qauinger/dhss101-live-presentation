<script lang='ts'>
	import { Axis, Bars, Chart, Svg, Highlight, Tooltip, Labels, Rule, Text } from 'layerchart';
	import QChart from './Q/QChart.svelte';
	import { format, PeriodType, type FormatType } from 'svelte-ux';
	import { scaleBand } from 'd3-scale';
	import QAxes from './Q/QAxes.svelte';

    export let title;
    export let data;
    export let x;
    export let y;
    export let xFormat: FormatType | undefined;
    export let yFormat: FormatType | undefined;
    export let xAxisTitle: string;
    export let yAxisTitle: string;
    export let xGrid: boolean = false;
    export let yGrid: boolean = false;
	export let xColor: string = '';
	export let yColor: string = 'fill-primary';
	export let xTickLabelProps: string = '';
</script>

<QChart {title}>
	<Chart
		{data}
		x={x}
		xScale={scaleBand().padding(0.4)}
		y={y}
		yDomain={[0, null]}
		yNice
		padding={{ top: 10, bottom: 40, left: 50, right: 50 }}
		tooltip={{ mode: 'band' }}

		let:xScale
		let:height
	>
		<Svg>
			<QAxes xLabel={xAxisTitle} yLabel={yAxisTitle} xFormat={xFormat} yFormat={yFormat} xGrid={xGrid} yGrid={yGrid} xLabelColor={xColor} yLabelColor={yColor}/>
			<Bars strokeWidth={1} class={yColor} />
			<Highlight area />
			<Labels format="integer" class="text-base" />
			
		</Svg>
		<Tooltip.Root let:data>
			<Tooltip.List>
				<Tooltip.Item label={xAxisTitle} value={x(data)} />
				<Tooltip.Item label={yAxisTitle} value={y(data)} />
			</Tooltip.List>
		</Tooltip.Root>
	</Chart>
</QChart>
