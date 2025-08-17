<script>
  export let ordered
  export let start
</script>

{#if ordered}
  <ol class="list-decimal list-inside" {start}><slot></slot></ol>
{:else}
  <ul class="list-disc list-inside"><slot></slot></ul>
{/if}