<script>
    import TabbedMenu from "../../TabbedMenu.svelte";
    import ProjectCreateEdit from "./ProjectCreateEdit.svelte";
    import ProjectManage from "./ProjectsManage.svelte";
</script>

<TabbedMenu tabs={
    [
        {
            name: "Post",
            component: ProjectCreateEdit
        }, {
            name: "Manage",
            component: ProjectManage
        }
    ]
} />