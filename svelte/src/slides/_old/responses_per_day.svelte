<script>
	import { scaleTime } from "d3-scale";
	import { Area, Axis, Chart, Highlight, LinearGradient, Rule, Svg, Tooltip, Text } from "layerchart";
	import { format, formatDate, PeriodType } from "svelte-ux";
	import { data } from "./by_day";
</script>

<div class="w-[95%]" style='margin: 0 auto; font-family: Verdana; font-size: 24px;'>
  Total number of survey responses per day.
</div>
<div class="h-[80vh] w-[95%]" style='margin: 0 auto;'>
    <Chart
      data={data}
      x="date"
      xScale={scaleTime()}
      y="responses"
      yDomain={[0, null]}
      yNice
      tooltip={{ mode: "bisect-x" }}
      padding={{ top: 20, bottom: 40, left: 40, right: 20 }}
      let:width
      let:height
      let:padding
      let:tooltip
      let:xScale
    >
      <Svg>
        <LinearGradient class="from-primary/60 to-primary/40" vertical let:url>
          <Area
            line={{ class: "stroke-2 stroke-primary opacity-80" }}
            fill={url}
          />
        </LinearGradient>
        <Highlight
          points={{ class: "stroke-danger fill-danger" }}
          lines={{ class: "stroke-danger [stroke-dasharray:unset]" }}
        />
        <Axis
          placement="left"
          label="Responses (count)"
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
          label="Date"
          labelPlacement="middle"
          labelProps={{ class: "fill-primary text-base" }}
          format={(d) => format(d, PeriodType.Day, { variant: "short" })}
          tickLabelProps={{
            class: "text-base",
          }}
          rule
        />
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
        <Tooltip.Header>{formatDate(data.date, PeriodType.Day)}</Tooltip.Header>
        <Tooltip.List>
          <Tooltip.Item label="Responses: " value={data.responses} />
        </Tooltip.List>
      </Tooltip.Root>
    </Chart>
  </div>