<script lang="ts">
    import { getAccessToken } from "../../../lib/globals";
    import { getServerURL } from "../../../lib/utils";

    let fileInput: HTMLInputElement;

    interface NewFileInfoDTO {
        id: string;
        newName: string;
    }

    let fileUploadInfo: string = "";

    async function uploadSubmit(e: SubmitEvent) {
        e.preventDefault();

        let formData = new FormData();
        if (!fileInput || !fileInput.files || fileInput.files.length != 1) {
            return;
        }

        formData.append('file', fileInput.files[0]);

        // Send request
        let req = await fetch(
            getServerURL() + "/file-storage/upload",
            {
                method: "POST",
                headers: {
                    authorization: `Bearer ${getAccessToken()}`
                },
                body: formData
            }
        );

        if (!req.ok) {
            let t = await req.text();
            alert(`Error uploading ${t}`);

            // try and reset form
            (e.target as HTMLFormElement | null)?.reset();
            return;
        }

        let res: NewFileInfoDTO = await req.json();
        fileUploadInfo = `File has been uploaded! ${fileInput.files[0].name} uploaded as ${getServerURL()}/file-storage/file/${res.newName} with ID ${res.id}`;
    
        // try and reset form
        (e.target as HTMLFormElement | null)?.reset();
    }
</script>

<div class="p-4">
    <p>Upload a file</p>

    <form on:submit={uploadSubmit}>
        <input type="file" name="file" bind:this={fileInput} class="border bg-gray-700 m-1">

        <input type="submit" value="Upload" class="block border p-2 m-1 cursor-pointer">
    </form>

    <hr class="bg-gray-500">

    <p>{fileUploadInfo}</p>
</div>