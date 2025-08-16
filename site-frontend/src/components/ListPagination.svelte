<script lang="ts">
    import { onMount } from "svelte";
    import { getServerURL } from "../lib/utils";

    interface ListPaginationProps {
        endpoint: string;
        listItem?: any;
    }

    let {
        endpoint,
        listItem
    }: ListPaginationProps = $props();

    let currentPage = $state(0);
    let maxPage = $state(0);
    let startItem = 0;
    let endItem = 0;
    let numberOfItems = 0;

    let currentItems = $state<any[]>();

    const itemsPerPage = 5;

    async function loadItems() {
        let req = await fetch(
            `${getServerURL()}${endpoint}/get?start=${startItem}&end=${endItem}`
        );

        if (!req.ok) throw "Failed to fetch data!";

        currentItems = await req.json();
    }

    async function goToPage(page: number) {
        if (page < 0) return;

        startItem = Math.min(page*itemsPerPage, numberOfItems);
        endItem = Math.min((page + 1)*itemsPerPage, numberOfItems);
        currentPage = page;
        currentItems = [];

        await loadItems();
    }

    // Load initial data
    onMount(async () => {
        let req = await fetch(
            `${getServerURL()}${endpoint}/get?info=totalItems`
        );
        if (!req.ok) throw "Could not get number of items for list pagination";
        
        numberOfItems = parseInt(await req.text(), 10);
        
        // Now set the default start & end
        startItem = 0;
        endItem = Math.min(itemsPerPage, numberOfItems);
        maxPage = Math.ceil(numberOfItems / itemsPerPage);

        await loadItems();
    });
</script>

<div class="flex flex-col w-full gap-4">
    <p class="font-bold">Displaying page {currentPage + 1} of {maxPage}</p>

    <div class="flex flex-col gap-2">
        {#if currentItems == null}
            <p>Loading...</p>
        {:else}
            {#if listItem}
                {#each currentItems as currentItem}
                    <svelte:component this={listItem} data={currentItem} />
                {/each}
            {/if}
        {/if}
    </div>

    <div class="flex gap-2 justify-center">
        {#each Array.from({ length: maxPage }, (_, i) => i) as i}
            <div class="p-2 rounded bg-blue-300 hover:bg-blue-400 cursor-pointer text-white" on:click={() => goToPage(i)}>
                <p>{i + 1}</p>
            </div>
        {/each}
    </div>
</div>

