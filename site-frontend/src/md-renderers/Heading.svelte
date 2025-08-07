<script>
  export let depth
  export let raw
  export let text
</script>

{#if depth === 1}
  <p class="text-4xl"><slot></slot></p>
{:else if depth === 2}
  <p class="text-3xl"><slot></slot></p>
{:else if depth === 3}
  <p class="text-2xl"><slot></slot></p>
{:else if depth === 4}
  <p class="text-xl"><slot></slot></p>
{:else if depth === 5}
  <p class="text-md"><slot></slot></p>
{:else if depth === 6}
  <p class="text-sm"><slot></slot></p>
{:else}
  {raw}
{/if}