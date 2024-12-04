<script>
  import { mean, median, mode } from 'd3-array';
  import { forceCollide, forceX, forceY } from 'd3-force';
  import { Axis, Chart, Circle, ForceSimulation, Grid, Rule, Svg, Text, Tooltip } from "layerchart";
  import { data } from "./minutes";

  const xForce = forceX().strength(3); 
  const yForce = forceY().strength(1);
  const collideForce = forceCollide().radius(10);
</script>

<div class="w-[95%]" style='margin: 0 auto; font-family: Verdana; font-size: 24px;'>
  Survey response durations. (Under 10 minutes)
</div>
<div class="text-2xl h-[80vh] w-[95%]" style='margin: 0 auto;'>
  <Chart
    data={data}
    x={(d) => d.duration}
    xNice
    yNice
    padding={{ top: 20, bottom: 32, left: 32, right: 20 }}
    let:xGet
    let:xScale
    let:height
    let:tooltip
  >
    {@const r = 6}
    {@const avg = mean(data, (d) => d.duration) ?? 0}
    {@const med = median(data, (d) => d.duration) ?? 0}
    <Svg>
      <Axis
        placement="bottom"
        format=none
        label="Duration (seconds)"
        labelPlacement="middle"
        labelProps={{ class: "fill-primary text-base" }}
        ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        tickLabelProps={{
          textAnchor: "start",
          class: "text-base",
        }}
        rule
      />
      <Grid x xTicks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
      <Rule
        x={avg}
        class="stroke-2 stroke-danger [stroke-dasharray:4] [stroke-linecap:round] "
      />
      <Text
        x={xScale(avg)}
        y={0}
        dx={10}
        dy={height - 10}
        value= {"Average: " + Math.floor(avg) + "m " + Math.round((avg - Math.floor(avg)) * 60) + "s"}
        textAnchor="start"
        verticalAnchor="end"
        class="text-sm fill-danger stroke-surface-100 stroke-2"
      />
      <Rule
        x={med}
        class="stroke-2 stroke-warning [stroke-dasharray:4] [stroke-linecap:round] "
      />
      <Text
        x={xScale(med)}
        y={0}
        dx={10}
        dy={height - 30}
        value= {"Median: " + Math.floor(med) + "m " + Math.round((med - Math.floor(med)) * 60) + "s"}
        textAnchor="start"
        verticalAnchor="end"
        class="text-sm fill-warning stroke-surface-100 stroke-2"
      />
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
            class="stroke-surface-100 fill-primary"
            on:pointermove={(e) => tooltip.show(e, node)}
            on:pointerleave={tooltip.hide}
          />
        {/each}
      </ForceSimulation>
    </Svg>

    <Tooltip.Root let:data>
      <Tooltip.List>
        <Tooltip.Item
          label="Duration:"
          value={Math.floor(data.duration) + "m " + Math.round((data.duration - Math.floor(data.duration)) * 60) + "s"}
        />
      </Tooltip.List>
    </Tooltip.Root>
  </Chart>
</div>
