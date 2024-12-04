<script>
	import { getContext } from 'svelte';
	import * as geo from 'd3-geo';
	import { number } from 'svelte-ux';

	const { data, width, height } = getContext('LayerCake');

	export let projectionName = 'geoAlbersUsa';
	export let points = [];
	
	$: projection = geo[projectionName]()
		.fitSize([$width, $height], $data);
</script>

<g class="points">
{#each points as d} 
	<circle
		cx={projection(d['pos'])[0]}
		cy={projection(d['pos'])[1]}
		r="5"
        stroke={d['color']}
        fill={d['color']}
	>
	</circle>
{/each}
</g>
