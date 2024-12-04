<script lang='ts'>
	import { mean, median, mode } from 'd3-array';
  import { geoAlbersUsa } from 'd3-geo';
	import { forceCollide, forceX, forceY } from 'd3-force';
	import { Axis, Chart, Circle, ForceSimulation, geoFitObjectTransform, GeoPath, GeoPoint, Grid, Rule, Svg, Text, Tooltip } from 'layerchart';
	import { states } from './states_geo';
	import { data } from './zip_codes';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

  const projection = geoAlbersUsa;
  let selectedStateId: any = null;
  let selectedCountiesFeatures: any = null;
</script>

<div class="w-[95%]" style="margin: 0 auto; font-family: Verdana; font-size: 24px;">
	Survey response durations. (Under 10 minutes)
</div>
<div class="text-2xl h-[80vh] w-[95%]" style="margin: 0 auto;">
	<Chart
    data={data}
    geo={{
      projection,
      // fitGeojson: states,
      applyTransform: ["translate", "scale"],
    }}
    transform={{
      initialScrollMode: "none",
      translateOnScale: true,
      tweened: { duration: 800, easing: cubicOut },
    }}
    tooltip={{ mode: "voronoi" }}
    let:projection
    let:transform
    let:tooltip
    let:width
    let:height
  >
    <!-- <TransformControls /> -->

    <Svg>
      {#each states.features as feature}
        <GeoPath
          geojson={feature}
          class="stroke-surface-content fill-surface-100 hover:fill-surface-content/10"
          {tooltip}
          on:click={(e) => {
            const { geoPath, event } = e.detail;

            if (selectedStateId === feature.id) {
              selectedStateId = null;
              transform.reset();
            } else {
              selectedStateId = feature.id;
              const featureTransform = geoFitObjectTransform(
                projection,
                [width, height],
                feature,
              );
              transform.setTranslate(featureTransform.translate);
              transform.setScale(featureTransform.scale);
            }
          }}
        />
      {/each}

      <g class="points pointer-events-none">
        {#each data as airport}
          <GeoPoint
            lat={airport.lat}
            long={airport.lon}
            r={6}
            class="fill-primary"
          />
        {/each}

        {#if tooltip.data}
          <GeoPoint
            lat={tooltip.data.lat}
            long={tooltip.data.lon}
            r={8}
            class="stroke-primary/50 fill-none"
            spring
          />
        {/if}
      </g>

      <!-- {#each selectedCountiesFeatures as feature (feature.id)}
        <g in:fade={{ duration: 300, delay: 600 }} out:fade={{ duration: 300 }}>
          <GeoPath
            geojson={feature}
            {tooltip}
            class="stroke-surface-content/10 hover:fill-surface-content/10"
            on:click={() => {
              selectedStateId = null;
              transform.reset();
            }}
          />
        </g>
      {/each} -->
    </Svg>

    <!-- <Tooltip.Root let:data>
        <Tooltip.Header>{data.zip}</Tooltip.Header>
        <Tooltip.List>
          <Tooltip.Item label="Latitude" value={data.lat} format="decimal" />
          <Tooltip.Item
            label="Longitude"
            value={data.lon}
            format="decimal"
          />
        </Tooltip.List>
      </Tooltip.Root> -->
  </Chart>
</div>
