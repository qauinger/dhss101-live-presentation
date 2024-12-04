<script lang='ts'>
	import { Axis } from "layerchart";
	import { format, Grid, PeriodType, type FormatType } from "svelte-ux";

    export let xLabel: string = '';
    export let yLabel: string = '';
    export let y2Label: string = '';
    export let xFormat: FormatType = 'none';
    export let yFormat: FormatType = 'none';
    export let y2Format: FormatType = 'none';
    export let xGrid: boolean = false;
    export let yGrid: boolean = false;
    export let xLabelColor: string = '';
    export let yLabelColor: string = ''
    export let y2LabelColor: string = ''
</script>

{#if xLabel != ''}
    <Axis
        placement="bottom"
        format={xFormat}
        label={xLabel}
        labelPlacement="middle"
        labelProps={{ class: "text-xl " + xLabelColor }}
        tickLabelProps={{
            class: 'text-base'
        }}
        grid={xGrid}
        rule
    />
{/if}

{#if yLabel != ''}
    <Axis
        placement="left"
        format={yFormat}
        label={yLabel}
        labelPlacement="middle"
        labelProps={{ class: "text-xl " + yLabelColor }}
        tickLabelProps={{
            class: "text-base"
        }}
        grid={yGrid}
        rule
    />
{/if}

{#if y2Label != ''}
    <Axis
        placement="right"
        format={y2Format}
        label={y2Label}
        labelPlacement="middle"
        labelProps={{ class: "text-xl " + y2LabelColor }}
        tickLabelProps={{
            class: "text-base"
        }}
        grid={yGrid}
        rule
    />
{/if}
