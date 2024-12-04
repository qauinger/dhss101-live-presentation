<script>
    import { LayerCake, Svg } from 'layercake';
	import QChart from "./Q/QChart.svelte";
    import usStates from '$lib/us-states-topojson.js';
	import * as pkg from 'topojson';
	import MapSvg from './map/MapSvg.svelte';
	import Points from './map/Points.svelte';

    export let title;
    export let data;

    const geojson = pkg.feature(usStates, usStates.objects.collection);
</script>

<QChart {title}>
	<LayerCake
		data={geojson}
		padding={{ top: 10, bottom: 40, left: 50, right: 50 }}
	>
		<Svg>
			<MapSvg
				projectionName={'geoAlbersUsa'}
			/>
			<Points 
			    projectionName={'geoAlbersUsa'}
				points={data}
			/>
		</Svg>
	</LayerCake>
</QChart>