<script lang="ts">
    import { login, logout, userData } from "./lib/globals";
    import { Router, Link, Route } from "svelte-routing";
    import HomePage from "./pages/HomePage.svelte";

    import Modal from './components/Modal.svelte';
    import BlogPostEditor from "./components/BlogPostEditor.svelte";
    import LogbookEditor from "./components/LogbookEditor.svelte";

    async function loginProcedure() {
        let username = prompt("Username?") ?? "";
        let password = prompt("Password?") ?? "";
        let result = await login(username, password);

        if (!result) alert("Failed to login!");
    }

    let blogEditorOpen = false;
    let logbookEditorOpen = false;

    export let url = "";
</script>

<Router {url}>
    <div class="bg-slate-700 w-full h-full flex flex-col items-center p-4 overflow-y-scroll">
        <p class="w-full md:w-3/4 text-white text-3xl m-2">zpike.net</p>
        <div class="w-full md:w-3/4 flex-col sm:flex-row flex gap-1">

            <div class="p-4 sm:w-3/4 w-full h-full bg-white">
                <Route path="/">
                    <HomePage />
                </Route>
            </div>

            <div class="p-4 sm:w-1/4 w-full h-full bg-white flex flex-col items-left">
                {#if $userData != null}
                    <p class="text-xl">Hello, <span class="font-bold">{$userData.displayName}</span>!</p>

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
                    </ul>

                    <!-- Blog post modal -->
                    <Modal title="Create Blog Post" bind:isOpen={blogEditorOpen}>
                        <BlogPostEditor />
                    </Modal>

                    <!-- Logbook modal -->
                    <Modal title="Logbook Editor" bind:isOpen={logbookEditorOpen}>
                        <LogbookEditor />
                    </Modal>
                {/if}
            </div>
        </div>
    </div>
</Router>