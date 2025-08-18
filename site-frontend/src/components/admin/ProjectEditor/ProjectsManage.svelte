<script lang="ts">
    import ListPagination from "../../ListPagination.svelte";
    import ProjectListItem from "./ProjectListItem.svelte";
</script>

<div class="p-2">
    <ListPagination endpoint={"/projects"} listItem={ProjectListItem} />
</div>