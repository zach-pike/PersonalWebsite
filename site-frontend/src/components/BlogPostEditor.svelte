<script lang="ts">
    import { getAccessToken } from "../lib/globals";
    import { getServerURL } from "../lib/utils";

    let title: string = "";
    let content: string ="";

    async function formHandler(e: SubmitEvent) {
        e.preventDefault();

        let conf = confirm("Are you sure you want to post this? Press OK to post!");

        if (!conf) return;

        let req = await fetch(
            `${getServerURL()}/blog/new`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({
                    title,
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

        title = "";
        content = "";
    }
</script>

<form class="flex flex-col border" on:submit={formHandler}>
    <div class="m-2 flex gap-2 items-center">
        <label for="title">Title:</label>
        <input type="text" name="title" class="border p-1 rounded grow focus:outline-none" bind:value={title}>
    </div>

    <div class="m-2 h-full">
        <label class="block" for="content">Content:</label>
        <textarea name="content" class="w-full block border rounded p-1 focus:outline-none" bind:value={content}></textarea>
    </div>
    
    <input type="submit" class="m-2 p-1 border rounded w-fit cursor-pointer" value="Post">
</form>