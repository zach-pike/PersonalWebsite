<script lang="ts">
    let {
        isOpen = $bindable(),
        title,
        children
    }: {
        isOpen: boolean,
        title: string,
        children?: () => any
    } = $props();
</script>

<div class="absolute bg-gray-500/75 top-0 left-0 right-0 bottom-0 flex items-center justify-center {isOpen ? "" : "hidden"}">
    <div class="w-3/4 h-3/4 bg-gray-100 flex flex-col">
        <div class="flex bg-blue-800 items-center p-2 text-white">
            <p>{title}</p>
            <div class="grow"></div>
            <p class="cursor-pointer" on:click={() => isOpen = false}>X</p>
        </div>
        <div class="p-4 overflow-auto flex-1">
            {@render children?.()}
        </div>
    </div>
</div>