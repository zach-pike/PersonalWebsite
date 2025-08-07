<script lang="ts">
    import { login, logout, tokens, userData } from "./lib/globals";
    import { getServerURL } from "./lib/utils";

    import { Router, Link, Route } from "svelte-routing";
    import HomePage from "./pages/HomePage.svelte";

    import Modal from './components/Modal.svelte';
    import CreateNewBlogPost from "./components/CreateNewBlogPost.svelte";

    async function loginProcedure() {
        let username = prompt("Username?") ?? "";
        let password = prompt("Password?") ?? "";
        let result = await login(username, password);

        if (!result) alert("Failed to login!");
    }

    let blogEditorOpen = false;

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
                <p class="font-bold">Navigation</p>

                <ul class="underline">
                    <li><a href="https://github.com/zach-pike">My Github</a></li>
                    <li><Link to="randomProject">Go to a random project</Link></li>
                    <li><Link to="qso">QSO book</Link></li>
                    <li><p class="cursor-pointer" on:click={loginProcedure}>Login</p></li>
                    <li><p class="cursor-pointer" on:click={logout}>Logout</p></li>
                </ul>

                {#if $userData != null && $userData.roles.includes("admin")}
                    <p class="font-bold text-red-800">Admin Panel items</p>
                
                    <ul class="underline">
                        <li><a href="#" on:click={() => blogEditorOpen = true}>Blog post editor</a></li>
                        <li><a href="#">QSO editor</a></li>
                    </ul>

                    <!-- Blog post modal -->
                    <Modal title="Create Blog Post" bind:isOpen={blogEditorOpen}>
                        <CreateNewBlogPost />
                    </Modal>
                {/if}
            </div>
        </div>
    </div>

</Router>