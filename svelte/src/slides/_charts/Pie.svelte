<script>

	import { Arc, Chart, Group, Legend, Pie, PieChart, Svg, Tooltip } from "layerchart";
	import QChart from "./Q/QChart.svelte";
	import { cubicInOut } from "svelte/easing";
	import { cls, format } from "svelte-ux";

    export let title;
    export let data;
	export let x;
	export let c;
	export let cRange;

	let dataSum = 0;
	data.forEach(d => {
		dataSum += d[x]
	})

	console.log(dataSum)
</script>

<QChart {title}>
	<Chart
		data={data}
		x={x}
		c={c}
		cRange={cRange}

		padding={{ top: 10, bottom: 40, left: 50, right: 50 }}
		let:tooltip
	>
		<Svg center>
			<Pie {tooltip} />
	  	</Svg>
		<Legend
			placement="bottom"
			variant="swatches"
			classes={{
				// root: "border px-3 py-2 bg-surface-200 rounded",
				// title: "text-lg text-center",
				label: "text-2xl mr-[20px]",
				swatch: "w-[32px] h-[32px] ml-[20px]"
				// tick: "stroke-surface-100",
		  	}}
		/>
		<Tooltip.Root let:data>
			<Tooltip.Header>{data[c]}</Tooltip.Header>
			<Tooltip.List>
			  <Tooltip.Item
				label="value"
				value={data[x]}
				format="integer"
				valueAlign="right"
			  />
			  <Tooltip.Item
				label="percent"
				value={data[x] / dataSum}
				format="percent"
				valueAlign="right"
			  />
			</Tooltip.List>
		  </Tooltip.Root>
	</Chart>
</QChart>
