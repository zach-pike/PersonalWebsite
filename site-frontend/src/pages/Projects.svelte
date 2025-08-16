<script lang="ts">
    import ListPagination from "../components/ListPagination.svelte";
    import ProjectListItem from "../components/ProjectListItem.svelte";
</script>

<p class="text-2xl font-bold">All my projects!</p>
<p>This is a collection of the projects that I am the most proud of, including some details on how each project was made and what I had to learn to make it.</p>

<hr class="bg-black">

<ListPagination endpoint="/projects" listItem={ProjectListItem} />