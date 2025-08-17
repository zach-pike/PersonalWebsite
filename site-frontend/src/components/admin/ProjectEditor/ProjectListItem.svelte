<script lang="ts">
    import type { Project } from "../../../lib/projects";
    import { getServerURL } from "../../../lib/utils";
    import { getAccessToken } from "../../../lib/globals"
    import ProjectListItem from "../../ProjectListItem.svelte"
    import { projectEditWritable } from "./projectStateStorage";
    import { getContext } from "svelte";

    let tabbedMenu = getContext<any>('tabbed-menu');

    let {
        data
    }: {
        data: Project
    } = $props();

    async function deletePost() {
        let conf = confirm("Do you really want to delete this post?");
        if (!conf) return;

        let req = await fetch(
            `${getServerURL()}/projects/delete`,
            {
                method: "POST",
                headers: {
                    'authorization': `Bearer ${getAccessToken()}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    toDelete: data._id
                })
            }
        );

        if (!req.ok) {
            alert("Failed to delete post!");
            return;
        }

        alert("Post deleted!");
    }

    async function editPost() {
        projectEditWritable.set(data);
        tabbedMenu.setCurrent(0);
    }
</script>

<div class="mx-2 p-2 border">
    <ProjectListItem data={data} />

    <div class="w-full flex justify-center gap-2 mt-2">
        <button class="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded cursor-pointer" on:click={editPost}>
            Edit
        </button>

        <button class="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded cursor-pointer" on:click={deletePost}>
            Delete
        </button>
    </div>
</div>