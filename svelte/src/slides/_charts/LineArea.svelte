<script lang='ts'>
    import { scaleTime } from "d3-scale";
	import { Area, Axis, Text, Chart, Highlight, LinearGradient, Rule, Svg, Tooltip } from "layerchart";
	import { format, formatDate, PeriodType, type FormatType } from "svelte-ux";
	import QChart from "./Q/QChart.svelte";
	import QAxes from "./Q/QAxes.svelte";
	import { mean } from "d3-array";

    export let title: string;
    export let data: any;
    export let x: string;
    export let y: string;
    export let xFormat: FormatType | undefined;
    export let yFormat: FormatType | undefined;
    export let xAxisTitle: string;
    export let yAxisTitle: string;
    export let xGrid: boolean = false;
    export let yGrid: boolean = false;
</script>

<QChart title={title}>
    <Chart
        data={data}
        x={x}
        xScale={scaleTime()}
        xNice

        y={y}
        yNice

        tooltip={{ mode: "bisect-x" }}
        padding={{ top: 10, bottom: 40, left: 50, right: 50 }}
        
        let:width
        let:height
        let:padding
        let:tooltip
        let:xScale
    >
        <Svg>
            <QAxes xLabel={xAxisTitle} yLabel={yAxisTitle} xFormat={xFormat} yFormat={yFormat} xGrid={xGrid} yGrid={yGrid} yLabelColor=""/>
            <LinearGradient class="from-primary/60 to-primary/40" vertical let:url>
                <Area
                    line={{ class: "stroke-2 stroke-primary opacity-80" }}
                    fill={url}
                />
            </LinearGradient>
            <Highlight
                points={{ class: "stroke-danger fill-danger" }}
                lines={{ class: "stroke-danger [stroke-dasharray:unset]" }}
            >
            </Highlight>
            <!-- <Axis
                placement="left"
                label={yAxisTitle}
                labelPlacement="middle"
                labelProps={{ class: "fill-primary text-base" }}
                tickLabelProps={{
                    class: "text-base",
                }}
                grid
                rule
            />
            <Axis
                placement="bottom"
                label={xAxisTitle}
                labelPlacement="middle"
                labelProps={{ class: "fill-primary text-base" }}
                format={(d) => format(d, PeriodType.Day, { variant: "short" })}
                tickLabelProps={{
                    class: "text-base",
                }}
                rule
            /> -->
        </Svg>
        <Tooltip.Root
            x="data"
            y={height + padding.top + 2}
            anchor="top"
            variant="none"
            class="text-sm font-semibold bg-danger text-primary-content leading-3 px-2 py-1 rounded whitespace-nowrap"
            let:data
        >
            {format(data.date, PeriodType.Day)}
        </Tooltip.Root>

        <Tooltip.Root let:data>
            <Tooltip.Header>
                {formatDate(data.date, PeriodType.Day)}
            </Tooltip.Header>
            <Tooltip.List>
                <Tooltip.Item label={yAxisTitle + ": "} value={(data[y])} />
            </Tooltip.List>
        </Tooltip.Root>
    </Chart>
</QChart>