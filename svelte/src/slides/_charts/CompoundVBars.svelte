<script lang='ts'>
	import { Axis, Bars, Chart, Svg, Highlight, Tooltip, Labels } from 'layerchart';
	import QChart from './Q/QChart.svelte';
	import { format, PeriodType, type FormatType } from 'svelte-ux';
	import { scaleBand } from 'd3-scale';
	import QAxes from './Q/QAxes.svelte';

    export let title;
    export let data;
    export let x;
    export let y1;
    export let y2;
    export let xFormat: FormatType | undefined;
    export let yFormat: FormatType | undefined;
    export let y2Format: FormatType | undefined;
    export let xAxisTitle: string;
    export let y1AxisTitle: string;
    export let y2AxisTitle: string;
    export let xGrid: boolean = false;
    export let yGrid: boolean = false;
    export let y1Color: string = 'fill-warning';
    export let y2Color: string = 'fill-danger';
</script>

<QChart {title}>
    <Chart
		{data}
		x={x}
		xScale={scaleBand().padding(0.4)}
		y={y1}
		yDomain={[0, null]}
		yNice
		padding={{ top: 10, bottom: 40, left: 50, right: 50 }}
		tooltip={{ mode: 'band' }}
	>
		<Svg>
			<QAxes
                xLabel={xAxisTitle}
                yLabel={y1AxisTitle}
                xFormat={xFormat}
                yFormat={yFormat}
                xGrid={xGrid}
                yGrid={yGrid}
                yLabelColor={y1Color}
            />
			<Bars strokeWidth={1} class={y1Color} />
		</Svg>
	</Chart>
    <Chart
		{data}
		x={x}
		xScale={scaleBand().padding(0.4)}
		y={y2}
		yDomain={[0, null]}
		yNice
		padding={{ top: 10, bottom: 40, left: 50, right: 50 }}
		tooltip={{ mode: 'band' }}
	>
		<Svg>
			<QAxes xLabel={xAxisTitle} y2Label={y2AxisTitle} xFormat={xFormat} y2Format={y2Format} xGrid={xGrid} yGrid={yGrid} y2LabelColor={y2Color}/>
			<Bars strokeWidth={1} inset={35} class={y2Color} />
			<Highlight area />
		</Svg>
		<Tooltip.Root let:data>
			<Tooltip.List>
				<Tooltip.Item label={xAxisTitle} value={xFormat(x(data))} />
				<Tooltip.Item label={y2AxisTitle} value={y2(data)} />
				<Tooltip.Item label={y1AxisTitle} value={y1(data)} />
			</Tooltip.List>
		</Tooltip.Root>
	</Chart>
</QChart>
