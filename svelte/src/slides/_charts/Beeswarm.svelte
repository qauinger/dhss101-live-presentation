<script lang='ts'>
	import { Axis, Chart, Circle, ForceSimulation, Rule, Text, Svg, Tooltip, type Accessor } from 'layerchart';
	import QChart from './Q/QChart.svelte';
	import { forceCollide, forceX, forceY } from 'd3-force';
	import QAxes from './Q/QAxes.svelte';
	import type { FormatType } from 'svelte-ux';
	import { mean } from 'd3-array';

    export let title: string;
    export let data: any;
    export let x: Accessor<unknown>;
    export let xAxisTitle: string = '';
    export let yAxisTitle: string = '';
    export let xFormat: FormatType | undefined;
    export let xGrid: boolean = false;
    export let xDomain;
    export let yColor: string = 'fill-primary';

    export let average: boolean = false;

    const xForce = forceX().strength(3); 
    const yForce = forceY().strength(1);
    const collideForce = forceCollide().radius(10);
</script>

<QChart title={title}>
    <Chart
    data={data}
    x={x}
    xDomain={xDomain}
    xNice

    padding={{ top: 10, bottom: 40, left: 50, right: 50 }}

    let:xGet
    let:xScale
    let:height
    let:tooltip
  >
    {@const r = 6}
    <Svg>
        <QAxes xLabel={xAxisTitle} xFormat={xFormat} yLabel={yAxisTitle} xGrid={xGrid} yLabelColor={yColor}/>
        <ForceSimulation
            forces={{
                x: xForce.x((d) => xGet(d)),
                y: yForce.y(height / 2),
                collide: collideForce.radius(r),
            }}
            static
            cloneData
            let:nodes
        >
            {#each nodes as node}
                <Circle
                    cx={node.x}
                    cy={node.y}
                    {r}
                    class={'stroke-surface-100 ' + yColor}
                    on:pointermove={(e) => tooltip.show(e, node)}
                    on:pointerleave={tooltip.hide}
                />
            {/each}
        </ForceSimulation>
        {#if average}
            {@const avg = mean(data, (d) => x(d)) ?? 0}
            <Rule
                x={avg}
                class="stroke-2 stroke-danger [stroke-dasharray:4] [stroke-linecap:round] "
            />
            <Text
                x={xScale(avg)}
                y={0}
                dx={10}
                dy={height - 10}
                value= {"Average: " + (Math.floor(avg / 60) + "m " + Math.round(avg % 60) + "s")}
                textAnchor="start"
                verticalAnchor="end"
                class="text-base fill-danger stroke-surface-100 stroke-2"
            />
        {/if}
    </Svg>

    <Tooltip.Root let:data>
        <Tooltip.List>
            <Tooltip.Item
              label="{xAxisTitle}:"
              value={xFormat(x(data))}
            />
          </Tooltip.List>
    </Tooltip.Root>
  </Chart>
</QChart>
