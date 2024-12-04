<script>
	import { getContext } from 'svelte';
	import * as geo from 'd3-geo';

	const { data, width, height } = getContext('LayerCake');

	export let projectionName = 'geoAlbersUsa';

	/* --------------------------------------------
	 * Add this in case you want to plot only a subset of the features
	 * while keeping the zoom on the whole geojson feature set
	 */
	export let features = $data.features;

	$: projection = geo[projectionName]()
		.fitSize([$width, $height], $data);

	$: geoPath = geo.geoPath(projection);
</script>

<g class="map-group">
	{#each features as feature}
		<path
			class="feature-path"
			fill="#555555"
			d="{geoPath(feature)}"
		></path>
	{/each}
</g>

<style>
	.feature-path {
		stroke: #333;
		stroke-width: 0.5px;
	}
</style>