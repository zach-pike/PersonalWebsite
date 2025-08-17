<script>
    import TabbedMenu from "../../TabbedMenu.svelte";
    import ProjectCreate from "./ProjectCreateEdit.svelte";
    import ProjectManage from "./ProjectsManage.svelte";
</script>

<TabbedMenu tabs={
    [
        {
            name: "Post",
            component: ProjectCreate
        }, {
            name: "Manage",
            component: ProjectManage
        }
    ]
} />