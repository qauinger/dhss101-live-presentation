<script lang='ts'>
    export let title: String = 'Chart Title';
</script>

<div class="w-[95%]" style='margin: 0 auto; font-family: Verdana; font-size: 36px;'>
    {title}
</div>
<div class="h-[80vh] w-[97%] grid grid-stack" style='margin: 0 auto;'>
    <slot />
</div>