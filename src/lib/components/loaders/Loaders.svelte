<script>
    import Ghost from "./Ghost.svelte";
    import Scifi from "./Scifi.svelte";

    const { variant = 'ghost', class:classNames } = $props();
</script>

<div class={classNames}>
    {#if variant=='scifi'}
        <Scifi />
    {:else if variant=='ghost'}
        <Ghost />
    {/if}
</div>