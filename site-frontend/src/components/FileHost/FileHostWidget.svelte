<script>
    import TabbedMenu from "../TabbedMenu.svelte";
    import FileManagerWidget from "./FileManagerWidget.svelte";

    import FileStorageWidget from "./FileUploadWidget.svelte";
</script>

<TabbedMenu 
    tabs={
        [
            {
                name: "Upload",
                component: FileStorageWidget
            },
            {
                name: "Manage",
                component: FileManagerWidget
            }
        ]
    } 
/>