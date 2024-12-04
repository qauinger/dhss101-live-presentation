<script>
    import data from '$lib/data';
    let other = data.filter(
        d => d.Q16_7_TEXT != ''
    )
    console.log(other)
</script>

<div class="w-[95%]" style='margin: 0 auto; font-family: Verdana; font-size: 36px;'>
    Attitudes on the Benefits of Investing in Campus Public Transit (Other)
</div>
<div style='height: 80vh; width: 60%; margin: 0 auto;'>
    {#each other as o}
        <h1 class='text-2xl py-[20px]'>{o.Q16_7_TEXT}</h1>
    {/each}
</div>
