<script lang="ts">
    import { getRecentLogbookPosts } from "../../lib/logbook";
    import { getServerURL } from "../../lib/utils";
    
    let posts = getRecentLogbookPosts(getServerURL());
</script>

<div class="w-full">
    {#await posts}
        <p>Loading logbook...</p>
    {:then awaitedPosts}
          {#if awaitedPosts.length < 1}
            <p>No logs to show!</p>
        {:else}
            <table class="min-w-full border border-gray-500 text-sm text-left">
                <thead class="uppercase">
                    <tr>
                        <th class="px-2 py-2 border-b">
                            <span class="hidden sm:inline">Band</span>
                            <span class="inline sm:hidden">B.</span>
                        </th>
                        <th class="px-2 py-2 border-b">
                            <span class="hidden sm:inline">Mode</span>
                            <span class="inline sm:hidden">M.</span>
                        </th>
                        <th class="px-2 py-2 border-b">
                            <span class="hidden sm:inline">Callsign</span>
                            <span class="inline sm:hidden">Call.</span>
                        </th>
                        <th class="px-2 py-2 border-b">
                            <span class="hidden sm:inline">Location</span>
                            <span class="inline sm:hidden">Loc.</span>
                        </th>
                        <th class="px-2 py-2 border-b">
                            <span class="hidden sm:inline">Strength</span>
                            <span class="inline sm:hidden">S.</span>
                        </th>
                        <th class="px-2 py-2 border-b">
                            <span class="hidden sm:inline">Notes</span>
                            <span class="inline sm:hidden">N.</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {#each awaitedPosts as p}
                        <tr class="even:bg-gray-100">
                            <td class="px-1 py-2 border-b">{p.band}</td>
                            <td class="px-1 py-2 border-b">{p.mode}</td>
                            <td class="px-1 py-2 border-b">{p.callsign}</td>
                            <td class="px-1 py-2 border-b">{p.location}</td>
                            <td class="px-1 py-2 border-b">{p.strength}</td>
                            <td class="px-1 py-2 border-b">{p.notes}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            
        {/if}
    {/await}
</div>