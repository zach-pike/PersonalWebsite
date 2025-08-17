<script lang="ts">
    import { setContext } from "svelte";

    interface TabItem {
        name: string,
        component?: any;
    }

    let {
        tabs
    }: { tabs: TabItem[] } = $props();

    let selected = $state(0);

    setContext('changePage', (p: number) => {
        selected = p;
    });
</script>

<div class="flex flex-col">
    <div class="w-full h-8 flex border">
        {#each tabs as t, i}
            <div 
                class="grow flex items-center justify-center cursor-pointer hover:bg-gray-200 {selected == i ? "bg-gray-300" : ""}" 
                on:click={() => selected = i}
            >
                <p class="cursor-pointer font-bold">{t.name}</p>
            </div>
        {/each}
    </div>

    <div class="grow border">
        {@render tabs[selected].component?.()}
    </div>
</div>