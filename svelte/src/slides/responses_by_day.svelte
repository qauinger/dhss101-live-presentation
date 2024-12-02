<script>
	import { scaleTime, scaleUtc, scaleBand } from "d3-scale";
	import { curveCatmullRom, curveCatmullRomClosed } from 'd3-shape';
	import { flatGroup } from 'd3-array';
	import { Area, Axis, Chart, Highlight, LinearGradient, Rule, Svg, Tooltip, Text, Spline, Points } from "layerchart";
	import { format, formatDate, PeriodType, cls } from "svelte-ux";
	import { data } from "./weekdays";
</script>

<div class="w-[95%]" style='margin: 0 auto; font-family: Verdana; font-size: 24px;'>
  Responses by day.
</div>
<div class="h-[80vh] w-[95%]" style='margin: 0 auto;'>
    <Chart
    data={data}
    x="weekday"
    xScale={scaleBand()}
    y="count"
    yPadding={[0, 10]}
    padding={{ top: 32, bottom: 8 }}
    radial
  >
    <Svg center>
      <Axis
        placement="radius"
        grid={{ class: "stroke-surface-content/20 fill-surface-200/50" }}
        ticks={[0, 5, 10]}
        format={(d) => ""}
      />
      <Axis placement="angle" grid={{ class: "stroke-surface-content/20" }} />
      <Spline class="stroke-primary fill-primary/20" />
      <Points class="fill-primary stroke-surface-200" />
    </Svg>
  </Chart>
</div>