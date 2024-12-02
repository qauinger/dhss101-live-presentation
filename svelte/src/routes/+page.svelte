<script lang='ts'>
	var SLIDE = 0;
	var mySlide = 0;
	import { onMount } from "svelte";
	import Intro from "../slides/intro.svelte";
	import ResponsesPerDay from "../slides/responses_per_day.svelte";
	import TotalResponsesOverTime from "../slides/total_responses_over_time.svelte";
	import ResponseDuration from "../slides/duration.svelte";
	import ResponsesByDay from "../slides/responses_by_day.svelte";
	import ResponsesByHour from "../slides/responses_by_hour.svelte";
	import ZipCodes from "../slides/zip_codes.svelte";

	onMount(async () => {
		setInterval(async function() {
			SLIDE = (await getSlide())['slide'];
 		}, 100);
	});

	async function getSlide(): Promise<any> {
		return fetch("http://localhost:3000/")
  		.then(response => response.json())
  		.then(data => {
    		return data;
  		}).catch(error => {
    		console.log(error);
    		return [];
  		});
	}
</script>

<main>
	<div style='padding: 20px;'>
		{ #if SLIDE == 0 }
			<Intro />
		{ :else if SLIDE == 1 }
			<ResponsesPerDay />
		{ :else if SLIDE == 2 }
			<TotalResponsesOverTime />
		{ :else if SLIDE == 3 }
			<ResponsesByDay />
		{ :else if SLIDE == 4 }
			<ResponsesByHour />
		{ :else if SLIDE == 5 }
			<ResponseDuration />
		{ :else if SLIDE == 6 }
			<!-- <ZipCodes /> -->
		{ /if }
	</div>
</main>
