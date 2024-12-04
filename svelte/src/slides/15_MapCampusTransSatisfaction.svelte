<script lang='ts'>
	import Map from "./_charts/Map.svelte";
    import data from '$lib/data';
    import zipConvert from '$lib/zip_lat_lon';
	import { likertToColor } from "./_charts/util/utils";
	import { Chart, Legend } from "layerchart";
	import { scaleOrdinal } from "d3-scale";

    function getCoord(zip: number) {
        return zipConvert.find(d => d.zip == zip);
    }

    let points: { pos: number[]; color: string; }[] = [];
    
    let hometownUsers = data.filter(d => d.Q12 != '')

    hometownUsers.forEach(d => {
        let c = getCoord(Number.parseInt(String(Number.parseInt(d.Q1+''))));
        if(c?.lat != undefined && c?.lon != undefined) {
            points.push({'pos': [c?.lon, c?.lat], 'color':likertToColor(Number.parseInt(d.Q12))})
        }
    })
</script>

<Map
    title='Satisfaction of Campus Transit by Hometown'
    data={points}
/>
<Chart
    data={[{ name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }, { name: "5" }]}
    c="name"
    cScale={scaleOrdinal()}
    
    cRange={[
      "red",
      "orange",
      "yellow",
      "lightgreen",
      "green",
    ]}
  >
    <Legend title="Satisfaction"
        placement="bottom"
        tickFontSize={20}
        classes={{
            title: "text-lg text-center",
            label: "text-lg",
            tick: "stroke-surface-100 text-lg",
        }}
    />
  </Chart>