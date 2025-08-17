<script lang="ts">
    import ListPagination from "../../ListPagination.svelte";
    import AdminProjectListItem from "./ProjectListItem.svelte";



</script>

<ListPagination endpoint={"/projects"} listItem={AdminProjectListItem} />