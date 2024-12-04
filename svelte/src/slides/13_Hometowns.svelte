<script lang='ts'>
	import Map from "./_charts/Map.svelte";
    import data from '$lib/data';
    import zipConvert from '$lib/zip_lat_lon';

    function getCoord(zip: number) {
        return zipConvert.find(d => d.zip == zip);
        // return c?.lat;
    }

    let zipcodes = data.flatMap(d => d.Q1);
    let points: { pos: number[]; color: string; }[] = [];
    zipcodes = zipcodes.filter((d) => Number.parseInt(String(d)) > 0)

    zipcodes.forEach((z) => {
        let c = getCoord(Number.parseInt(String(z)));
        // console.log(c)
        if(c?.lat != undefined && c?.lon != undefined) {
            points.push({'pos': [c?.lon, c?.lat], 'color':'rgb(32, 119, 240)'})
        }
    });

    console.log(points)
</script>

<Map
    title='Respondent Hometowns (United States Only)'
    data={points}
/>