<script lang="ts">
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
	export let leftpad: number = 20;
</script>

<QChart {title}>
	<Chart
		{data}
		{x}
		xDomain={[0, null]}
		xNice
		{y}
		yScale={scaleBand().padding(0.4)}
		padding={{ top: 10, bottom: 40, left: leftpad, right: 50 }}
		tooltip={{ mode: 'band' }}
	>
		<Svg>
			<QAxes
				xLabel={xAxisTitle}
				yLabel={yAxisTitle}
				{xFormat}
				{yFormat}
				{xGrid}
				{yGrid}
				xLabelColor={xColor}
				yLabelColor={yColor}
			/>
			<Bars strokeWidth={1} class="fill-primary" />
			<Highlight area />
		</Svg>
		<!-- <Tooltip.Root let:data>
      <Tooltip.Header
        >{format(data.date, PeriodType.Custom, {
          custom: "eee, MMMM do",
        })}</Tooltip.Header
      >
      <Tooltip.List>
        <Tooltip.Item label="value" value={data.value} />
      </Tooltip.List>
    </Tooltip.Root> -->
	</Chart>
</QChart>
