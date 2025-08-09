<script lang="ts">
    interface TabItem {
        name: string,
        component?: any;
    }

    let {
        tabs
    }: { tabs: TabItem[] } = $props();

    let selected = $state(0);
</script>

<div class="flex flex-col h-full">
    <div class="w-full h-1/10 flex border">
        {#each tabs as t, i}
            <div 
                class="grow flex items-center justify-center cursor-pointer hover:bg-gray-500 {selected == i ? "bg-gray-600" : ""}" 
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