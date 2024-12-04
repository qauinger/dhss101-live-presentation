<script lang='ts'>
	var SLIDE = 0;
	var mySlide = 0;
	import { onMount } from "svelte";
	import Introduction from "../slides/0_Introduction.svelte";
	import ResponsesOverTime from "../slides/1_ResponsesOverTimeBeeswarm.svelte";
	import TotalResponsesOverTime from "../slides/2_ResponsesOverTimeArea.svelte";
	import ResponsesByTimeOfDay from "../slides/3_ResponseTimeBeeswarm.svelte";
	import ResponseDuration from "../slides/4_ResponseDurationBeeswarm.svelte";
	import CarOwnership from "../slides/5_CarOwnershipPie.svelte";
	import LivingSituation from "../slides/6_StudentResidencePie.svelte";
	import CampusTransitSatisfaction from "../slides/7_CampusTransitSatisfactionBar.svelte";
	import HomeTransitSatisfaction from "../slides/8_HomeTransitSatisfactionBar.svelte";
	import SatisfactionsOverlayed from "../slides/9_CampusVsHomeSatisfactionBar.svelte";
	import UsedToVsNewToSatisfaction from "../slides/10_CampusTransitSatisfactionByHometownUsageBar.svelte";
	import ModeToCampus from "../slides/12_ModeToCampus.svelte";
	import Hometowns from "../slides/13_Hometowns.svelte";
	import MapHometownTransSatisfaction from "../slides/14_MapHometownTransSatisfaction.svelte";
	import MapCampusTransSatisfaction from "../slides/15_MapCampusTransSatisfaction.svelte";
	import Familiarities from "../slides/16_Familiarities.svelte";
	import CampusInvestment from "../slides/17_CampusInvestment.svelte";
	import MoreLikelyToUse from "../slides/18_MoreLikelyToUse.svelte";
	import MoreLikelyToUseOther from '../slides/18A_MoreLikelyToUseOther.svelte'
	import CampusInvestmentOther from '../slides/17A_CampusInvestmentOther.svelte'
	import Fun from '../slides/X_Fun.svelte'

	onMount(async () => {
		setInterval(async function() {
			SLIDE = (await getSlide())['slide'];
 		}, 100);
	});

	async function getSlide(): Promise<any> {
		return fetch("http://localhost:3000")
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
		<Introduction />
		{ :else if SLIDE == 1 }
		<ResponsesOverTime />
		{ :else if SLIDE == 2 }
		<TotalResponsesOverTime />
		{ :else if SLIDE == 3 }
		<ResponsesByTimeOfDay />
		{ :else if SLIDE == 4 }
		<ResponseDuration />
		{ :else if SLIDE == 5 }
		<CarOwnership />
		{ :else if SLIDE == 6 }
		<LivingSituation />
		{ :else if SLIDE == 7 }
		<Hometowns />
		{ :else if SLIDE == 8 }
		<CampusTransitSatisfaction />
		{ :else if SLIDE == 9 }
		<MapCampusTransSatisfaction />
		{ :else if SLIDE == 10 }
		<HomeTransitSatisfaction />
		{ :else if SLIDE == 11 }
		<MapHometownTransSatisfaction />
		{ :else if SLIDE == 12 }
		<SatisfactionsOverlayed />
		{ :else if SLIDE == 13 }
		<UsedToVsNewToSatisfaction />
		{ :else if SLIDE == 14 }
		<ModeToCampus />
		{ :else if SLIDE == 15 }
		<Familiarities />
		{ :else if SLIDE == 16 }
		<CampusInvestment />
		{ :else if SLIDE == 17 }
		<CampusInvestmentOther />
		{ :else if SLIDE == 18 }
		<MoreLikelyToUse />
		{ :else if SLIDE == 19 }
		<MoreLikelyToUseOther />
		{ :else }
		<Fun />
		{ /if }
	</div>
</main>
