<script>
	import { Chart, Canvas, GeoPath, HitCanvas, Legend, Tooltip } from 'layerchart';
	import { Button } from 'svelte-ux';
</script>

<main class="p-2 grid place-items-center content-center">
	<div class="h-[600px]">
		<Chart
		  geo={{
			projection,
			fitGeojson: states,
		  }}
		  transform={{
			mode: "canvas",
			initialScrollMode: "scale",
		  }}
		  padding={{ top: 60 }}
		  let:tooltip
		  let:transform
		>
		  {@const strokeWidth = 1 / transform.scale}
		  <!-- <TransformControls /> -->
	  
		  <Canvas>
			<GeoPath
			  geojson={states}
			  class="fill-surface-content/10 stroke-surface-100"
			  {strokeWidth}
			/>
		  </Canvas>
	  
		  <Canvas>
			<GeoPath
			  render={(ctx, { geoPath }) => {
				for (var feature of enrichedCountiesFeatures) {
				  const [x, y] = geoPath.centroid(feature);
				  const d = feature.properties.data;
				  const radius = rScale(d?.population ?? 0);
				  const color = colorScale(d?.percentUnder18 ?? 0);
				  ctx.strokeStyle = color;
				  ctx.lineWidth = strokeWidth;
				  ctx.fillStyle = color + (256 * 0.5).toString(16);
				  ctx.beginPath();
				  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
				  ctx.fill();
				  ctx.stroke();
				}
			  }}
			/>
		  </Canvas>
	  
		  {#if tooltip.data}
			<Canvas>
			  <GeoPath
				geojson={tooltip.data}
				class="stroke-none fill-surface-content/10"
				{strokeWidth}
			  />
			</Canvas>
		  {/if}
	  
		  <HitCanvas
			let:nextColor
			let:setColorData
			on:pointermove={(e) => tooltip.show(e.detail.event, e.detail.data)}
			on:pointerleave={tooltip.hide}
		  >
			<GeoPath
			  render={(ctx, { geoPath }) => {
				for (var feature of enrichedCountiesFeatures) {
				  const color = nextColor();
	  
				  ctx.beginPath();
				  geoPath(feature);
				  ctx.fillStyle = color;
				  ctx.fill();
	  
				  setColorData(color, feature);
				}
			  }}
			/>
		  </HitCanvas>
	  
		  <Legend
			scale={colorScale}
			title="Est. Percent under 18"
			placement="top-left"
		  />
	  
		  <Tooltip.Root let:data>
			{@const d = data.properties.data}
			<Tooltip.Header>
			  {data.properties.name + " - " + data.properties.data?.state}
			</Tooltip.Header>
			<Tooltip.List>
			  <Tooltip.Item
				label="Total Population"
				value={d?.population}
				format="integer"
				valueAlign="right"
			  />
			  <Tooltip.Item
				label="Est. Population under 18"
				value={d?.populationUnder18}
				format="integer"
				valueAlign="right"
			  />
			  <Tooltip.Item
				label="Est. Percent under 18"
				value={d?.percentUnder18 / 100}
				format="percentRound"
				valueAlign="right"
			  />
			</Tooltip.List>
		  </Tooltip.Root>
		</Chart>
	  </div>
	  
</main>
