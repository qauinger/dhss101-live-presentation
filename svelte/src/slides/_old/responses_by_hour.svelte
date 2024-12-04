<script>
    import { mean, median, mode } from 'd3-array';
    import { forceCollide, forceX, forceY } from 'd3-force';
    import { Axis, Chart, Circle, ForceSimulation, Grid, Rule, Svg, Text, Tooltip } from "layerchart";
    import { data } from "./start_time";
  
    const xForce = forceX().strength(3); 
    const yForce = forceY().strength(1);
    const collideForce = forceCollide().radius(10);
  </script>
  
  <div class="w-[95%]" style='margin: 0 auto; font-family: Verdana; font-size: 24px;'>
    Survey responses by time.
  </div>
  <div class="text-2xl h-[80vh] w-[95%]" style='margin: 0 auto;'>
    <Chart
      data={data}
      x={(d) => (d.hour + (d.minute / 60))}
      xNice
      yNice
      padding={{ top: 20, bottom: 32, left: 32, right: 20 }}
      let:xGet
      let:xScale
      let:height
      let:tooltip
    >
      {@const r = 6}
      <Svg>
        <Axis
          placement="bottom"
          format=none
          label="Hour of Day"
          labelPlacement="middle"
          labelProps={{ class: "fill-primary text-base" }}
          tickLabelProps={{
            textAnchor: "start",
            class: "text-base",
          }}
          rule
        />
        <Grid x xTicks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]} />
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
            label="Time:"
            value={data.hour + ":" + String(data.minute).padStart(2, '0')}
          />
        </Tooltip.List>
      </Tooltip.Root>
    </Chart>
  </div>
  