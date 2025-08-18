<script lang="ts">
    import { onMount } from "svelte";
    import { getServerURL } from "../../lib/utils";

    interface SongInfo {
        name: string;
        artist: string;
        album: string;
        albumArt: string;
    };

    let spotifyData: SongInfo | null = null;
    
    onMount(() => {
        // Load the spotify data
        fetch(
            getServerURL() + '/spotify/recentlyPlayed'
        ).then(v => {
            if (!v.ok) return;
            return v.json();
        }).then(v => {
            spotifyData = v;
        });
    });
</script>

{#if spotifyData}
    <div class="w-full flex gap-2 items-center">
        <img src="{spotifyData.albumArt}" class="w-14 h-14" alt="{spotifyData.album}">

        <div class="h-full">
            <p>{spotifyData.name}</p>
            <p class="text-sm italic">{spotifyData.album}</p>
            <p class="text-xs">{spotifyData.artist}</p>
        </div>
    </div>
{:else}
    <div class="h-14 flex items-center justify-center">
        <p>Could not load spotify data!</p>
    </div>
{/if}