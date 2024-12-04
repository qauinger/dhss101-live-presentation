<script>
    import data from '$lib/data';
    let other = data.filter(
        d => d.Q15_8_TEXT != ''
    )
    console.log(other)
</script>

<div class="w-[95%]" style='margin: 0 auto; font-family: Verdana; font-size: 36px;'>
    Factors That Would Increase Likelihood of Using Campus Public Transit (Other)
</div>
<div style='height: 80vh; width: 60%; margin: 0 auto;'>
    {#each other as o}
        <h1 class='text-2xl py-[20px]'>{o.Q15_8_TEXT}</h1>
    {/each}
</div>
