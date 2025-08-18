<script lang="ts">
    import { initAuth, login, logout, userData } from "./lib/globals";
    import { Router, Link, Route } from "svelte-routing";
    import HomePage from "./pages/HomePage.svelte";

    import Modal from './components/Modal.svelte';
    import BlogPostEditor from "./components/BlogPostEditor.svelte";
    import LogbookEditor from "./components/LogbookEditor.svelte";
    import { onMount } from "svelte";
    import FileHost from "./components/admin/FileHost/FileHost.svelte";
    import SpotifyWidget from "./components/widgets/SpotifyWidget.svelte";
    import Projects from "./pages/Projects.svelte";
    import ProjectEditor from "./components/admin/ProjectEditor/ProjectEditor.svelte";
    import ViewProject from "./pages/ViewProject.svelte";

    async function loginProcedure() {
        let username = prompt("Username?") ?? "";
        let password = prompt("Password?") ?? "";
        let result = await login(username, password);

        if (!result) alert("Failed to login!");
    }

    let blogEditorOpen = false;
    let logbookEditorOpen = false;
    let fileUploadManagerOpen = false;
    let projectPostEditorOpen = false;

    export let url = "";

    onMount(() => {
        initAuth();
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

                <Route path="/projects">
                    <Projects />
                </Route>

                <Route path="/projects/:id" let:params>
                    <ViewProject projectId={params.id} />
                </Route>
            </div>

            <div class="p-4 w-full h-full bg-white flex flex-col items-left">
                {#if $userData != null}
                    <p class="text-xl">Hello, <span class="font-bold">{$userData.displayName}</span>!</p>

                    <hr class="bg-black my-2">
                {/if}

                <p class="font-bold">Song last listened to</p>
                <SpotifyWidget />    

                <hr class="bg-black my-2">

                <p class="font-bold">Navigation</p>

                <ul class="underline">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="projects">My projects</Link></li>
                    <li><a href="https://github.com/zach-pike">My GitHub</a></li>
                    <!-- <li><Link to="logbook">QSO book</Link></li> -->

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
                    <hr class="bg-black my-2">

                    <p class="font-bold text-red-800">Admin Panel items</p>
                
                    <ul class="underline">
                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <li><a href="#" on:click={() => blogEditorOpen = true}>Blogpost editor</a></li>
                        
                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <li><a href="#" on:click={() => logbookEditorOpen = true}>Logbook editor</a></li>

                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <li><a href="#" on:click={() => fileUploadManagerOpen = true}>File upload</a></li>

                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <li><a href="#" on:click={() => projectPostEditorOpen = true}>Project Post editor</a></li>
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
                        <FileHost />
                    </Modal>

                    <Modal title="Project Post" bind:isOpen={projectPostEditorOpen}>
                        <ProjectEditor />
                    </Modal>
                {/if}
            </div>

            <div class="w-full h-32 bg-white sm:col-span-2 flex items-center justify-center flex-col">
                <p>&copy; Zachary Pike 2025</p>
                <div class="flex gap-2 sm:flex-row flex-col sm:items-left items-center">
                    <p>Some of my friends websites</p>
                    <p class="sm:block hidden">|</p>
                    <a href="https://of-random.net" class="text-blue-500">of-random.net</a>
                    <a href="https://wrzeczak.net/" class="text-blue-500">wrzeczak.net</a>
                </div>
            </div>
        </div>
    </div>
</Router>