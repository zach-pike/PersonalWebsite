<script lang="ts">
    import { getRecentBlogPosts } from "./lib/blog";
    import { getServerURL } from "./lib/utils";
    let posts = getRecentBlogPosts(getServerURL());
</script>

<div class="w-full">
    {#await posts}
        <p>Loading blog posts...</p>
    {:then awaitedPosts}
        {#if awaitedPosts.length < 1}
            <p>No posts to show!</p>
        {:else}
            {#each awaitedPosts as p}
                <div class="bg-gray-200 p-4 my-1">
                    <p><span class="font-bold">{p.title}</span> <span class="italic text-sm">{new Date(p.time).toLocaleString('en-US')}</span></p>
                    <p>{p.content}</p>
                </div>
            {/each}
        {/if}
    {/await}
</div>