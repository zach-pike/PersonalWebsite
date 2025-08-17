<script>
    import TabbedMenu from "../../TabbedMenu.svelte";
    import FileHostManager from "./FileHostManage.svelte";
    import FileHostUpload from "./FileHostUpload.svelte";
</script>

<TabbedMenu 
    tabs={
        [
            {
                name: "Upload",
                component: FileHostUpload
            },
            {
                name: "Manage",
                component: FileHostManager
            }
        ]
    } 
/>