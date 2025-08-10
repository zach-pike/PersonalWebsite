<script lang="ts">
    import { initAuth, login, logout, userData } from "./lib/globals";
    import { Router, Link, Route } from "svelte-routing";
    import HomePage from "./pages/HomePage.svelte";

    import Modal from './components/Modal.svelte';
    import BlogPostEditor from "./components/BlogPostEditor.svelte";
    import LogbookEditor from "./components/LogbookEditor.svelte";
    import { onMount } from "svelte";
    import FileHostWidget from "./components/FileHost/FileHostWidget.svelte";
    import { getServerURL } from "./lib/utils";

    async function loginProcedure() {
        let username = prompt("Username?") ?? "";
        let password = prompt("Password?") ?? "";
        let result = await login(username, password);

        if (!result) alert("Failed to login!");
    }

    let blogEditorOpen = false;
    let logbookEditorOpen = false;
    let fileUploadManagerOpen = false;

    interface SongInfo {
        name: string;
        artist: string;
        album: string;
        albumArt: string;
    };

    let spotifyData: SongInfo | null = null;

    export let url = "";

    onMount(() => {
        initAuth();

        // Load the spotify data
        fetch(
            getServerURL() + '/spotify/recentlyPlayed'
        ).then(v => {
            if (!v.ok) return;

            return v.json();
        }).then(v => {
            spotifyData = v;
            console.log(v);
        });
    });
</script>

<Router {url}>
    <div class="bg-slate-700 w-full h-full flex flex-col items-center p-4 overflow-y-scroll">
        <p class="w-full md:w-3/4 text-white text-3xl m-2">zpike.net</p>
        <div class="gap-1 grid grid-cols-1 sm:grid-cols-[3fr_1fr] w-full md:w-3/4">

            <div class="p-4 w-full h-full bg-white">
                <Route path="/">
                    <HomePage />
                </Route>
            </div>

            <div class="p-4 w-full h-full bg-white flex flex-col items-left">
                {#if $userData != null}
                    <p class="text-xl">Hello, <span class="font-bold">{$userData.displayName}</span>!</p>

                    <div class="w-full bg-gray-500 h-[1px] m-2"></div>
                {/if}

                {#if spotifyData != null}
                    <p class="font-bold">Song last listened to</p>
                    <div class="w-full h-16 flex gap-2">
                        <div class="h-full">
                            <img src="{spotifyData.albumArt}" class="h-full">
                        </div>

                        <div>
                            <p>{spotifyData.name}</p>
                            <p class="text-sm">{spotifyData.album}</p>
                            <p class="text-xs">{spotifyData.artist}</p>
                        </div>
                    </div>

                    <div class="w-full bg-gray-500 h-[1px] m-2"></div>
                {/if}

                <p class="font-bold">Navigation</p>

                <ul class="underline">
                    <li><a href="https://github.com/zach-pike">My Github</a></li>
                    <li><Link to="randomProject">Go to a random project</Link></li>
                    <li><Link to="logbook">QSO book</Link></li>

                    {#if $userData == null}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                        <li><p class="cursor-pointer" on:click={loginProcedure}>Login</p></li>
                    {:else}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                        <li><p class="cursor-pointer" on:click={logout}>Logout</p></li>
                    {/if}
                </ul>
                
                <!-- If user is admin display admin items -->
                {#if $userData != null && $userData.roles.includes("admin")}
                    <div class="w-full bg-gray-500 h-[1px] m-2"></div>

                    <p class="font-bold text-red-800">Admin Panel items</p>
                
                    <ul class="underline">
                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <li><a href="#" on:click={() => blogEditorOpen = true}>Blogpost editor</a></li>
                        
                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <li><a href="#" on:click={() => logbookEditorOpen = true}>Logbook editor</a></li>

                        <li><a href="#" on:click={() => fileUploadManagerOpen = true}>File upload</a></li>
                    </ul>

                    <!-- Blog post modal -->
                    <Modal title="Create Blog Post" bind:isOpen={blogEditorOpen}>
                        <BlogPostEditor />
                    </Modal>

                    <!-- Logbook modal -->
                    <Modal title="Logbook Editor" bind:isOpen={logbookEditorOpen}>
                        <LogbookEditor />
                    </Modal>

                    <!-- File Upload -->
                    <Modal title="Upload a file" bind:isOpen={fileUploadManagerOpen}>
                        <FileHostWidget />
                    </Modal>
                {/if}
            </div>

            <div class="w-full h-32 bg-white sm:col-span-2 flex items-center justify-center flex-col">
                <p>&copy; Zachary Pike 2025</p>
                <div class="flex gap-2">
                    <p>Some of my friends websites</p>
                    <p>|</p>
                    <a href="https://of-random.net" class="text-blue-500">of-random.net</a>
                    <a href="https://wrzeczak.net/" class="text-blue-500">wrzeczak.net</a>
                </div>
            </div>
        </div>
    </div>
</Router>