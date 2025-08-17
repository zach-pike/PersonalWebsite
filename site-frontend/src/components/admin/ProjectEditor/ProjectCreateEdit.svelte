<script lang="ts">
    import { getAccessToken } from "../../../lib/globals";
    import { getServerURL } from "../../../lib/utils";
    import { projectEditWritable } from "./projectStateStorage";
    
    let isEditing = $state(false);
    let editID = "";

    let title: string = $state("");
    let description: string = $state("");
    let content: string = $state("");
    let projectPhoto: string = $state("");

    $effect(() => {
        if (!$projectEditWritable) return;

        title = $projectEditWritable.title;
        description = $projectEditWritable.description;
        content = $projectEditWritable.content;
        projectPhoto = $projectEditWritable.projectPhoto;

        isEditing = true;
        editID = $projectEditWritable._id;
    });

    async function newProject() {
        let conf = confirm("Are you sure you want to post this? Press OK to post!");

        if (!conf) return;

        let req = await fetch(
            `${getServerURL()}/projects/new`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    projectPhoto,
                    content
                })
            }
        );

        if (!req.ok) {
            let text = await req.text();
            alert("Failed to post! " + text);
            return;
        }

        alert("Posted!");
    }

    async function editProject() {
        let conf = confirm("Are you sure you want to edit this? Press OK to edit!");

        if (!conf) return;

        let req = await fetch(
            `${getServerURL()}/projects/edit`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({
                    toEdit: editID,
                    updatedFields: {
                        title,
                        description,
                        projectPhoto,
                        content
                    }
                })
            }
        );

        if (!req.ok) {
            let text = await req.text();
            alert("Failed to post! " + text);
            return;
        }

        alert("Posted!");
    }

    function clearFields() {
        title = "";
        content = "";
        description = "";
        projectPhoto = "";
    }

    function cancelEdit() {
        editID = "";
        isEditing = false;
        $projectEditWritable = null;
    }

    function resetForm() {
        cancelEdit();
        clearFields();
    }

    async function formHandler(e: SubmitEvent) {
        e.preventDefault();

        if (isEditing)
            await editProject();
        else
            await newProject();

        resetForm();
    }
</script>

<form class="flex flex-col" on:submit={formHandler}>
    {#if isEditing}
        <p class="text-2xl font-bold">You are editing!</p>
        <button on:click={resetForm} class="m-2 p-1 border rounded w-fit cursor-pointer">Cancel Edit</button>
    {/if}

    <div class="m-2 flex gap-2 items-center">
        <label for="title">Title:</label>
        <input type="text" name="title" class="border p-1 rounded grow focus:outline-none" bind:value={title}>
    </div>

    <div class="m-2 flex gap-2 items-center">
        <label for="description">Description:</label>
        <input type="text" name="description" class="border p-1 rounded grow focus:outline-none" bind:value={description}>
    </div>

    <div class="m-2 flex gap-2 items-center">
        <label for="image">Project Image:</label>
        <input type="text" name="image" class="border p-1 rounded grow focus:outline-none" bind:value={projectPhoto}>
    </div>

    <div class="m-2 h-full">
        <label class="block" for="content">Content:</label>
        <textarea name="content" class="w-full block border rounded p-1 focus:outline-none" bind:value={content}></textarea>
    </div>
    
    <input type="submit" class="m-2 p-1 border rounded w-fit cursor-pointer" value="Post">
</form>